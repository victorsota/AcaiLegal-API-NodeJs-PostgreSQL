import { prismaClient } from "../../prisma";

interface CategoryRequest {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    if (!name) {
      throw new Error("Nome não informado");
    }

    const category = await prismaClient.category.create({
      data: { name },
      select: {
        id: true,
        name: true,
      },
    });

    return category;
  }
}

export { CreateCategoryService };
