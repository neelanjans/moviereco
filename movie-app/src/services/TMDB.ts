import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_KEY, TMDB_API_BASE_URL } from "@/utils/config";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: TMDB_API_BASE_URL }),

  endpoints: (builder) => ({
    getShows: builder.query({
      query: ({
        category,
        type,
        searchQuery,
        page,
        showSimilarShows,
        id,
        genreId,
      }: {
        category: string | undefined;
        type?: string;
        page?: number;
        searchQuery?: string;
        showSimilarShows?: boolean;
        id?: number;
        genreId?: string;
      }) => {
        if (searchQuery) {
          return `search/${category}?api_key=${API_KEY}&query=${searchQuery}&page=${page}`;
        }

        if (showSimilarShows) {
          return `${category}/${id}/similar?api_key=${API_KEY}`;
        }

        if (genreId) {
          return `discover/${category}?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`;
        }

        return `${category}/${type}?api_key=${API_KEY}&page=${page}`;
      },
    }),

    getShow: builder.query({
      query: ({ category, id }: { category: string; id: number }) =>
        `${category}/${id}?append_to_response=videos,credits&api_key=${API_KEY}`,
    }),

    getGenres: builder.query({
      query: ({ category }: { category: string }) =>
        `genre/${category}/list?api_key=${API_KEY}`,
    }),
  }),
});

export const { useGetShowsQuery, useGetShowQuery, useGetGenresQuery } = tmdbApi;
