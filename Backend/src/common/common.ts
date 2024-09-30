export const prisma_convert = (data: any): any => {
  return JSON.parse(JSON.stringify(data));
};
