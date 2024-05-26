import { StoryFn } from "@storybook/react/*";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

export function RouterDecorator(Story: StoryFn) {
    const router = createBrowserRouter([
        {
            path: "*",
            element: <Story />,
        },
    ]);

    return <RouterProvider router={router} />;
}
