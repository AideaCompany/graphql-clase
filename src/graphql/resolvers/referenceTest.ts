import ReferenceTest from "../../models/referenceTest";

export const resolver = {
  Query: {
    async listReferenceTest(): Promise<any> {
      // ???
      return [];
    },
  },
  Mutation: {
    async createReferenceTest(_: any, { input }: any) {
      // ????
      return {};
    },
  },
};
