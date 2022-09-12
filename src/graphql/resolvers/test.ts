import Test from "../../models/test";

export const resolver = {
  Query: {
    async listTest() {
      return await Test.find().lean();
    },
  },
  Mutation: {
    async createTest(_: any, { input }: any) {
      const newTest = new Test(input);
      return await newTest.save();
    },
  },
};
