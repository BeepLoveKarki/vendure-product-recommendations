import { FindManyOptions } from "typeorm/find-options/FindManyOptions";
import { ID, TransactionalConnection } from "@vendure/core";
import { DeletionResponse } from "@vendure/common/lib/generated-types";
import { ProductRecommendation } from "./product-recommendation.entity";
import { ProductRecommendationInput } from "./index";
export declare class ProductRecommendationService {
    private connection;
    constructor(connection: TransactionalConnection);
    findAll(ctx: any, options: FindManyOptions<ProductRecommendation> | undefined): Promise<ProductRecommendation[]>;
    findOne(ctx: any, recommendationId: ID): Promise<ProductRecommendation | undefined>;
    create(ctx: any, input: ProductRecommendationInput): Promise<ProductRecommendation>;
    delete(ctx: any, ids: any[]): Promise<DeletionResponse>;
}
