import Test from "../../models/test";
import ReferenceTest from "../../models/referenceTest";

export const resolver = {
  Query: {
    async listReferenceTest(): Promise<any> {
      const result = await ReferenceTest.find();
      return result;
    },
  },
  Mutation: {
    async createReferenceTest(_: any, { input }: any) {
      const newReferenceTest = new ReferenceTest(input);
      return await newReferenceTest.save();
    },
  },

  ReferenceTest: {
    test: async (parent: any) => {
      return await Test.findById(parent.test);
    },
  },
};
