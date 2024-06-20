import { Spinner, View, Text } from 'tamagui'
import React, { useEffect, useState } from 'react'
import { Doc } from '@/interfaces/bookApiResults'
import { Image } from 'react-native'
import checkAndFetchCover from '@/utils/checkAndFetchCover'

type BookCardProps = {
  book: Doc
}

interface ImageSource {
  uri?: string;
}

// Error may occur due to props!
export default function BookCard({ book } : BookCardProps ) {
  //Set Zustand stores for the states
  const [coverImage, setCoverImage] = useState<ImageSource | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCover = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const image = await checkAndFetchCover(book.isbn);
        setCoverImage(image ? { uri: URL.createObjectURL(image) } : null);
        console.log(coverImage);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCover();
  }, [book.isbn])

  return (
    <View w={105} h={150} >
      <View alignItems="center" justifyContent="center">
        {isLoading && (<Spinner color="#6247AA" size="large" />)}
        {error && (<View w={105} h={105} backgroundColor="#FF6969" alignItems="center" justifyContent="center">
          <Text>There was an error loading the cover.</Text>
          {console.log(error)}
        </View>)}
        {!coverImage && (<View w={105} h={105} backgroundColor="#FF6969" alignItems="center" justifyContent="center">
          <Text>There was no cover found.</Text>
        </View>)}
        {!isLoading && !error && coverImage && (
          <Image source={coverImage} style={{width: 'auto', height: 'auto'}} />
        )}
        <Text>{book.title}</Text>
        <Text>{book.author_name}</Text>
      </View>
    </View>
  )
}