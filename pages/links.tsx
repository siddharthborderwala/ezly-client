import React, { useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function useLink(linkId: string) {}

function useCollections() {
  const { data, error } = useSWR('/v1/collections/all', fetcher);

  return {
    collections: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useCollection(collectionId: string) {
  const { data, error } = useSWR(`/v1/collections/${collectionId}`, fetcher);

  return {
    collections: data,
    isLoading: !error && !data,
    isError: error,
  };
}

const LinksPage: React.FC = () => {
  const { collections, isLoading, isError } = useCollections();

  return <>Links Page</>;
};

export default LinksPage;
