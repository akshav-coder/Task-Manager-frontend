import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).token
        : null;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Task"], // Define a tag type for tasks
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "tasks",
      providesTags: ["Task"], // Tag the getTasks query with the "Task" tag
    }),
    createTask: builder.mutation({
      query: (newTask) => ({
        url: "tasks",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Task"], // Invalidate the "Task" tag to refetch the tasks
    }),
    updateTask: builder.mutation({
      query: ({ id, ...updatedTask }) => ({
        url: `tasks/${id}`,
        method: "PUT",
        body: updatedTask,
      }),
      invalidatesTags: ["Task"], // Invalidate the "Task" tag to refetch the tasks
    }),
    loginUser: builder.mutation({
      query: (userCredentials) => ({
        url: "users/login",
        method: "POST",
        body: userCredentials,
      }),
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "users/register",
        method: "POST",
        body: newUser,
      }),
    }),
    googleAuth: builder.mutation({
      query: (data) => ({
        url: "users/google",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useLoginUserMutation,
  useDeleteTaskMutation,
  useRegisterUserMutation,
  useGoogleAuthMutation,
} = apiSlice;
