import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/typeorm";
import { Connection, In } from "typeorm";
import { FindManyOptions } from "typeorm/find-options/FindManyOptions";
import {
  ID,
  RequestContext,
  assertFound,
  patchEntity,
  getEntityOrThrow,
  Product,
  TransactionalConnection
} from "@vendure/core";
import {
  DeletionResponse,
  DeletionResult,
} from "@vendure/common/lib/generated-types";
import { ProductRecommendation } from "./product-recommendation.entity";
import { ProductRecommendationInput } from "./index";

@Injectable()
export class ProductRecommendationService {
  constructor(private connection: TransactionalConnection) {}

  findAll(
    ctx: any,
    options: FindManyOptions<ProductRecommendation> | undefined
  ): Promise<ProductRecommendation[]> {
    return this.connection.getRepository(ctx,ProductRecommendation).find(options);
  }
  findOne(ctx: any,recommendationId: ID): Promise<ProductRecommendation | undefined> {
    return this.connection
      .getRepository(ctx,ProductRecommendation)
      .findOne(recommendationId, { loadEagerRelations: true });
  }

  async create(
    ctx: any,
    input: ProductRecommendationInput
  ): Promise<ProductRecommendation> {
    const recommendation = new ProductRecommendation({
      product: await this.connection
        .getRepository(ctx,Product)
        .findOne(input.product),
      recommendation: await this.connection
        .getRepository(ctx,Product)
        .findOne(input.recommendation),
      type: input.type,
    });
    const newRecommendation = await this.connection
      .getRepository(ctx,ProductRecommendation)
      .save(recommendation);

    return assertFound(this.findOne(ctx,newRecommendation.id));
  }

  async delete(ctx: any,ids: any[]): Promise<DeletionResponse> {
    try {
		
	  await this.connection.getRepository(ctx,ProductRecommendation).delete(ids);

      return {
        result: DeletionResult.DELETED,
      };
    } catch (e) {
      return {
        result: DeletionResult.NOT_DELETED,
        message: e.toString(),
      };
    }
  }
}
