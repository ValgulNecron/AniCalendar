import {NextAuthOptions} from "next-auth";
import {NextApiRequest, NextApiResponse} from "next";

type NextAuthOptionsCallback = (req: NextApiRequest, res: NextApiResponse) => NextAuthOptions;

declare module "next-auth" {
    interface UserImage {
        medium: string;
        large: string;
    }

    interface Session {
        user: {
            id: string | undefined;
            image: UserImage;
            name: string;
        };
    }
}
