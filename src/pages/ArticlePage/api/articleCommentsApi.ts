import { Comment } from "entities/Comment";
import { rtkApi } from "shared/api/rtkApi";

const commentsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleComments: build.query<Comment[], string>({
            query: (id) => ({
                url: "/comments",
                params: {
                    articleId: id,
                    _expand: "user",
                },
            }),
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                      [
                          ...result.map(({ id }) => ({ type: "Comments" as const, id })),
                          { type: "Comments", id: "LIST" },
                      ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                      [{ type: "Comments", id: "LIST" }],
        }),
        postNewComment: build.mutation<
            Comment,
            { text: string; userId: string; articleId: string }
        >({
            query: (body) => {
                return { url: "/comments", method: "POST", body };
            },
            invalidatesTags: [{ type: "Comments", id: "LIST" }],
        }),
    }),
});

export const useArticleComments = commentsApi.useGetArticleCommentsQuery;
export const useSaveArticleComment = commentsApi.usePostNewCommentMutation;
