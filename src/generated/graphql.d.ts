import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  interval: any;
  jsonb: any;
  timestamptz: any;
};

/** Boolean expression to compare columns of type "Float". All fields are combined with logical 'AND'. */
export type Float_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Float']>;
  _gt?: InputMaybe<Scalars['Float']>;
  _gte?: InputMaybe<Scalars['Float']>;
  _in?: InputMaybe<Array<Scalars['Float']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Float']>;
  _lte?: InputMaybe<Scalars['Float']>;
  _neq?: InputMaybe<Scalars['Float']>;
  _nin?: InputMaybe<Array<Scalars['Float']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "ingredients" */
export type Ingredients = {
  __typename?: 'ingredients';
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  name: Scalars['String'];
  /** An array relationship */
  recipe_ingredients: Array<Recipe_Ingredients>;
  /** An aggregate relationship */
  recipe_ingredients_aggregate: Recipe_Ingredients_Aggregate;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "ingredients" */
export type IngredientsRecipe_IngredientsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};


/** columns and relationships of "ingredients" */
export type IngredientsRecipe_Ingredients_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};

/** aggregated selection of "ingredients" */
export type Ingredients_Aggregate = {
  __typename?: 'ingredients_aggregate';
  aggregate?: Maybe<Ingredients_Aggregate_Fields>;
  nodes: Array<Ingredients>;
};

/** aggregate fields of "ingredients" */
export type Ingredients_Aggregate_Fields = {
  __typename?: 'ingredients_aggregate_fields';
  avg?: Maybe<Ingredients_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Ingredients_Max_Fields>;
  min?: Maybe<Ingredients_Min_Fields>;
  stddev?: Maybe<Ingredients_Stddev_Fields>;
  stddev_pop?: Maybe<Ingredients_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Ingredients_Stddev_Samp_Fields>;
  sum?: Maybe<Ingredients_Sum_Fields>;
  var_pop?: Maybe<Ingredients_Var_Pop_Fields>;
  var_samp?: Maybe<Ingredients_Var_Samp_Fields>;
  variance?: Maybe<Ingredients_Variance_Fields>;
};


/** aggregate fields of "ingredients" */
export type Ingredients_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Ingredients_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Ingredients_Avg_Fields = {
  __typename?: 'ingredients_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "ingredients". All fields are combined with a logical 'AND'. */
export type Ingredients_Bool_Exp = {
  _and?: InputMaybe<Array<Ingredients_Bool_Exp>>;
  _not?: InputMaybe<Ingredients_Bool_Exp>;
  _or?: InputMaybe<Array<Ingredients_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  recipe_ingredients?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "ingredients" */
export enum Ingredients_Constraint {
  /** unique or primary key constraint */
  IngredientsNameKey = 'ingredients_name_key',
  /** unique or primary key constraint */
  IngredientsPkey = 'ingredients_pkey'
}

/** input type for incrementing numeric columns in table "ingredients" */
export type Ingredients_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "ingredients" */
export type Ingredients_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  recipe_ingredients?: InputMaybe<Recipe_Ingredients_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Ingredients_Max_Fields = {
  __typename?: 'ingredients_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Ingredients_Min_Fields = {
  __typename?: 'ingredients_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "ingredients" */
export type Ingredients_Mutation_Response = {
  __typename?: 'ingredients_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Ingredients>;
};

/** input type for inserting object relation for remote table "ingredients" */
export type Ingredients_Obj_Rel_Insert_Input = {
  data: Ingredients_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Ingredients_On_Conflict>;
};

/** on_conflict condition type for table "ingredients" */
export type Ingredients_On_Conflict = {
  constraint: Ingredients_Constraint;
  update_columns?: Array<Ingredients_Update_Column>;
  where?: InputMaybe<Ingredients_Bool_Exp>;
};

/** Ordering options when selecting data from "ingredients". */
export type Ingredients_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  recipe_ingredients_aggregate?: InputMaybe<Recipe_Ingredients_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: ingredients */
export type Ingredients_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "ingredients" */
export enum Ingredients_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "ingredients" */
export type Ingredients_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Ingredients_Stddev_Fields = {
  __typename?: 'ingredients_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Ingredients_Stddev_Pop_Fields = {
  __typename?: 'ingredients_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Ingredients_Stddev_Samp_Fields = {
  __typename?: 'ingredients_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Ingredients_Sum_Fields = {
  __typename?: 'ingredients_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "ingredients" */
export enum Ingredients_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Ingredients_Var_Pop_Fields = {
  __typename?: 'ingredients_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Ingredients_Var_Samp_Fields = {
  __typename?: 'ingredients_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Ingredients_Variance_Fields = {
  __typename?: 'ingredients_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "interval". All fields are combined with logical 'AND'. */
export type Interval_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['interval']>;
  _gt?: InputMaybe<Scalars['interval']>;
  _gte?: InputMaybe<Scalars['interval']>;
  _in?: InputMaybe<Array<Scalars['interval']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['interval']>;
  _lte?: InputMaybe<Scalars['interval']>;
  _neq?: InputMaybe<Scalars['interval']>;
  _nin?: InputMaybe<Array<Scalars['interval']>>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "ingredients" */
  delete_ingredients?: Maybe<Ingredients_Mutation_Response>;
  /** delete single row from the table: "ingredients" */
  delete_ingredients_by_pk?: Maybe<Ingredients>;
  /** delete data from the table: "recipe_ingredients" */
  delete_recipe_ingredients?: Maybe<Recipe_Ingredients_Mutation_Response>;
  /** delete single row from the table: "recipe_ingredients" */
  delete_recipe_ingredients_by_pk?: Maybe<Recipe_Ingredients>;
  /** delete data from the table: "recipes" */
  delete_recipes?: Maybe<Recipes_Mutation_Response>;
  /** delete single row from the table: "recipes" */
  delete_recipes_by_pk?: Maybe<Recipes>;
  /** delete data from the table: "tag" */
  delete_tag?: Maybe<Tag_Mutation_Response>;
  /** delete single row from the table: "tag" */
  delete_tag_by_pk?: Maybe<Tag>;
  /** delete data from the table: "units" */
  delete_units?: Maybe<Units_Mutation_Response>;
  /** delete single row from the table: "units" */
  delete_units_by_pk?: Maybe<Units>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "ingredients" */
  insert_ingredients?: Maybe<Ingredients_Mutation_Response>;
  /** insert a single row into the table: "ingredients" */
  insert_ingredients_one?: Maybe<Ingredients>;
  /** insert data into the table: "recipe_ingredients" */
  insert_recipe_ingredients?: Maybe<Recipe_Ingredients_Mutation_Response>;
  /** insert a single row into the table: "recipe_ingredients" */
  insert_recipe_ingredients_one?: Maybe<Recipe_Ingredients>;
  /** insert data into the table: "recipes" */
  insert_recipes?: Maybe<Recipes_Mutation_Response>;
  /** insert a single row into the table: "recipes" */
  insert_recipes_one?: Maybe<Recipes>;
  /** insert data into the table: "tag" */
  insert_tag?: Maybe<Tag_Mutation_Response>;
  /** insert a single row into the table: "tag" */
  insert_tag_one?: Maybe<Tag>;
  /** insert data into the table: "units" */
  insert_units?: Maybe<Units_Mutation_Response>;
  /** insert a single row into the table: "units" */
  insert_units_one?: Maybe<Units>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "ingredients" */
  update_ingredients?: Maybe<Ingredients_Mutation_Response>;
  /** update single row of the table: "ingredients" */
  update_ingredients_by_pk?: Maybe<Ingredients>;
  /** update data of the table: "recipe_ingredients" */
  update_recipe_ingredients?: Maybe<Recipe_Ingredients_Mutation_Response>;
  /** update single row of the table: "recipe_ingredients" */
  update_recipe_ingredients_by_pk?: Maybe<Recipe_Ingredients>;
  /** update data of the table: "recipes" */
  update_recipes?: Maybe<Recipes_Mutation_Response>;
  /** update single row of the table: "recipes" */
  update_recipes_by_pk?: Maybe<Recipes>;
  /** update data of the table: "tag" */
  update_tag?: Maybe<Tag_Mutation_Response>;
  /** update single row of the table: "tag" */
  update_tag_by_pk?: Maybe<Tag>;
  /** update data of the table: "units" */
  update_units?: Maybe<Units_Mutation_Response>;
  /** update single row of the table: "units" */
  update_units_by_pk?: Maybe<Units>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
};


/** mutation root */
export type Mutation_RootDelete_IngredientsArgs = {
  where: Ingredients_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Ingredients_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Recipe_IngredientsArgs = {
  where: Recipe_Ingredients_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Ingredients_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_RecipesArgs = {
  where: Recipes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipes_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_TagArgs = {
  where: Tag_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Tag_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_UnitsArgs = {
  where: Units_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Units_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootInsert_IngredientsArgs = {
  objects: Array<Ingredients_Insert_Input>;
  on_conflict?: InputMaybe<Ingredients_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Ingredients_OneArgs = {
  object: Ingredients_Insert_Input;
  on_conflict?: InputMaybe<Ingredients_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_IngredientsArgs = {
  objects: Array<Recipe_Ingredients_Insert_Input>;
  on_conflict?: InputMaybe<Recipe_Ingredients_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Ingredients_OneArgs = {
  object: Recipe_Ingredients_Insert_Input;
  on_conflict?: InputMaybe<Recipe_Ingredients_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_RecipesArgs = {
  objects: Array<Recipes_Insert_Input>;
  on_conflict?: InputMaybe<Recipes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipes_OneArgs = {
  object: Recipes_Insert_Input;
  on_conflict?: InputMaybe<Recipes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TagArgs = {
  objects: Array<Tag_Insert_Input>;
  on_conflict?: InputMaybe<Tag_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Tag_OneArgs = {
  object: Tag_Insert_Input;
  on_conflict?: InputMaybe<Tag_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UnitsArgs = {
  objects: Array<Units_Insert_Input>;
  on_conflict?: InputMaybe<Units_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Units_OneArgs = {
  object: Units_Insert_Input;
  on_conflict?: InputMaybe<Units_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_IngredientsArgs = {
  _inc?: InputMaybe<Ingredients_Inc_Input>;
  _set?: InputMaybe<Ingredients_Set_Input>;
  where: Ingredients_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Ingredients_By_PkArgs = {
  _inc?: InputMaybe<Ingredients_Inc_Input>;
  _set?: InputMaybe<Ingredients_Set_Input>;
  pk_columns: Ingredients_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_IngredientsArgs = {
  _inc?: InputMaybe<Recipe_Ingredients_Inc_Input>;
  _set?: InputMaybe<Recipe_Ingredients_Set_Input>;
  where: Recipe_Ingredients_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Ingredients_By_PkArgs = {
  _inc?: InputMaybe<Recipe_Ingredients_Inc_Input>;
  _set?: InputMaybe<Recipe_Ingredients_Set_Input>;
  pk_columns: Recipe_Ingredients_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_RecipesArgs = {
  _append?: InputMaybe<Recipes_Append_Input>;
  _delete_at_path?: InputMaybe<Recipes_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Recipes_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Recipes_Delete_Key_Input>;
  _inc?: InputMaybe<Recipes_Inc_Input>;
  _prepend?: InputMaybe<Recipes_Prepend_Input>;
  _set?: InputMaybe<Recipes_Set_Input>;
  where: Recipes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipes_By_PkArgs = {
  _append?: InputMaybe<Recipes_Append_Input>;
  _delete_at_path?: InputMaybe<Recipes_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Recipes_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Recipes_Delete_Key_Input>;
  _inc?: InputMaybe<Recipes_Inc_Input>;
  _prepend?: InputMaybe<Recipes_Prepend_Input>;
  _set?: InputMaybe<Recipes_Set_Input>;
  pk_columns: Recipes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_TagArgs = {
  _inc?: InputMaybe<Tag_Inc_Input>;
  _set?: InputMaybe<Tag_Set_Input>;
  where: Tag_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Tag_By_PkArgs = {
  _inc?: InputMaybe<Tag_Inc_Input>;
  _set?: InputMaybe<Tag_Set_Input>;
  pk_columns: Tag_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UnitsArgs = {
  _inc?: InputMaybe<Units_Inc_Input>;
  _set?: InputMaybe<Units_Set_Input>;
  where: Units_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Units_By_PkArgs = {
  _inc?: InputMaybe<Units_Inc_Input>;
  _set?: InputMaybe<Units_Set_Input>;
  pk_columns: Units_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "ingredients" */
  ingredients: Array<Ingredients>;
  /** fetch aggregated fields from the table: "ingredients" */
  ingredients_aggregate: Ingredients_Aggregate;
  /** fetch data from the table: "ingredients" using primary key columns */
  ingredients_by_pk?: Maybe<Ingredients>;
  /** An array relationship */
  recipe_ingredients: Array<Recipe_Ingredients>;
  /** An aggregate relationship */
  recipe_ingredients_aggregate: Recipe_Ingredients_Aggregate;
  /** fetch data from the table: "recipe_ingredients" using primary key columns */
  recipe_ingredients_by_pk?: Maybe<Recipe_Ingredients>;
  /** An array relationship */
  recipes: Array<Recipes>;
  /** An aggregate relationship */
  recipes_aggregate: Recipes_Aggregate;
  /** fetch data from the table: "recipes" using primary key columns */
  recipes_by_pk?: Maybe<Recipes>;
  /** fetch data from the table: "tag" */
  tag: Array<Tag>;
  /** fetch aggregated fields from the table: "tag" */
  tag_aggregate: Tag_Aggregate;
  /** fetch data from the table: "tag" using primary key columns */
  tag_by_pk?: Maybe<Tag>;
  /** fetch data from the table: "units" */
  units: Array<Units>;
  /** fetch aggregated fields from the table: "units" */
  units_aggregate: Units_Aggregate;
  /** fetch data from the table: "units" using primary key columns */
  units_by_pk?: Maybe<Units>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Query_RootIngredientsArgs = {
  distinct_on?: InputMaybe<Array<Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ingredients_Order_By>>;
  where?: InputMaybe<Ingredients_Bool_Exp>;
};


export type Query_RootIngredients_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ingredients_Order_By>>;
  where?: InputMaybe<Ingredients_Bool_Exp>;
};


export type Query_RootIngredients_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootRecipe_IngredientsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};


export type Query_RootRecipe_Ingredients_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};


export type Query_RootRecipe_Ingredients_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootRecipesArgs = {
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


export type Query_RootRecipes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


export type Query_RootRecipes_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootTagArgs = {
  distinct_on?: InputMaybe<Array<Tag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tag_Order_By>>;
  where?: InputMaybe<Tag_Bool_Exp>;
};


export type Query_RootTag_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tag_Order_By>>;
  where?: InputMaybe<Tag_Bool_Exp>;
};


export type Query_RootTag_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootUnitsArgs = {
  distinct_on?: InputMaybe<Array<Units_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Units_Order_By>>;
  where?: InputMaybe<Units_Bool_Exp>;
};


export type Query_RootUnits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Units_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Units_Order_By>>;
  where?: InputMaybe<Units_Bool_Exp>;
};


export type Query_RootUnits_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};

/** columns and relationships of "recipe_ingredients" */
export type Recipe_Ingredients = {
  __typename?: 'recipe_ingredients';
  amount: Scalars['Float'];
  id: Scalars['Int'];
  index: Scalars['Int'];
  /** An object relationship */
  ingredient: Ingredients;
  ingredient_id: Scalars['Int'];
  /** An object relationship */
  recipe: Recipes;
  recipe_id: Scalars['Int'];
  section?: Maybe<Scalars['String']>;
  unit: Scalars['Int'];
  /** An object relationship */
  unitByUnit: Units;
};

/** aggregated selection of "recipe_ingredients" */
export type Recipe_Ingredients_Aggregate = {
  __typename?: 'recipe_ingredients_aggregate';
  aggregate?: Maybe<Recipe_Ingredients_Aggregate_Fields>;
  nodes: Array<Recipe_Ingredients>;
};

/** aggregate fields of "recipe_ingredients" */
export type Recipe_Ingredients_Aggregate_Fields = {
  __typename?: 'recipe_ingredients_aggregate_fields';
  avg?: Maybe<Recipe_Ingredients_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Recipe_Ingredients_Max_Fields>;
  min?: Maybe<Recipe_Ingredients_Min_Fields>;
  stddev?: Maybe<Recipe_Ingredients_Stddev_Fields>;
  stddev_pop?: Maybe<Recipe_Ingredients_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recipe_Ingredients_Stddev_Samp_Fields>;
  sum?: Maybe<Recipe_Ingredients_Sum_Fields>;
  var_pop?: Maybe<Recipe_Ingredients_Var_Pop_Fields>;
  var_samp?: Maybe<Recipe_Ingredients_Var_Samp_Fields>;
  variance?: Maybe<Recipe_Ingredients_Variance_Fields>;
};


/** aggregate fields of "recipe_ingredients" */
export type Recipe_Ingredients_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "recipe_ingredients" */
export type Recipe_Ingredients_Aggregate_Order_By = {
  avg?: InputMaybe<Recipe_Ingredients_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recipe_Ingredients_Max_Order_By>;
  min?: InputMaybe<Recipe_Ingredients_Min_Order_By>;
  stddev?: InputMaybe<Recipe_Ingredients_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Recipe_Ingredients_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Recipe_Ingredients_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Recipe_Ingredients_Sum_Order_By>;
  var_pop?: InputMaybe<Recipe_Ingredients_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Recipe_Ingredients_Var_Samp_Order_By>;
  variance?: InputMaybe<Recipe_Ingredients_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "recipe_ingredients" */
export type Recipe_Ingredients_Arr_Rel_Insert_Input = {
  data: Array<Recipe_Ingredients_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Recipe_Ingredients_On_Conflict>;
};

/** aggregate avg on columns */
export type Recipe_Ingredients_Avg_Fields = {
  __typename?: 'recipe_ingredients_avg_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  index?: Maybe<Scalars['Float']>;
  ingredient_id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  unit?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "recipe_ingredients" */
export type Recipe_Ingredients_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  ingredient_id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  unit?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "recipe_ingredients". All fields are combined with a logical 'AND'. */
export type Recipe_Ingredients_Bool_Exp = {
  _and?: InputMaybe<Array<Recipe_Ingredients_Bool_Exp>>;
  _not?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
  _or?: InputMaybe<Array<Recipe_Ingredients_Bool_Exp>>;
  amount?: InputMaybe<Float_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  index?: InputMaybe<Int_Comparison_Exp>;
  ingredient?: InputMaybe<Ingredients_Bool_Exp>;
  ingredient_id?: InputMaybe<Int_Comparison_Exp>;
  recipe?: InputMaybe<Recipes_Bool_Exp>;
  recipe_id?: InputMaybe<Int_Comparison_Exp>;
  section?: InputMaybe<String_Comparison_Exp>;
  unit?: InputMaybe<Int_Comparison_Exp>;
  unitByUnit?: InputMaybe<Units_Bool_Exp>;
};

/** unique or primary key constraints on table "recipe_ingredients" */
export enum Recipe_Ingredients_Constraint {
  /** unique or primary key constraint */
  RecipeIngredientsIdKey = 'recipe_ingredients_id_key',
  /** unique or primary key constraint */
  RecipeIngredientsPkey = 'recipe_ingredients_pkey'
}

/** input type for incrementing numeric columns in table "recipe_ingredients" */
export type Recipe_Ingredients_Inc_Input = {
  amount?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['Int']>;
  index?: InputMaybe<Scalars['Int']>;
  ingredient_id?: InputMaybe<Scalars['Int']>;
  recipe_id?: InputMaybe<Scalars['Int']>;
  unit?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "recipe_ingredients" */
export type Recipe_Ingredients_Insert_Input = {
  amount?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['Int']>;
  index?: InputMaybe<Scalars['Int']>;
  ingredient?: InputMaybe<Ingredients_Obj_Rel_Insert_Input>;
  ingredient_id?: InputMaybe<Scalars['Int']>;
  recipe?: InputMaybe<Recipes_Obj_Rel_Insert_Input>;
  recipe_id?: InputMaybe<Scalars['Int']>;
  section?: InputMaybe<Scalars['String']>;
  unit?: InputMaybe<Scalars['Int']>;
  unitByUnit?: InputMaybe<Units_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Recipe_Ingredients_Max_Fields = {
  __typename?: 'recipe_ingredients_max_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Int']>;
  index?: Maybe<Scalars['Int']>;
  ingredient_id?: Maybe<Scalars['Int']>;
  recipe_id?: Maybe<Scalars['Int']>;
  section?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "recipe_ingredients" */
export type Recipe_Ingredients_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  ingredient_id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  section?: InputMaybe<Order_By>;
  unit?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recipe_Ingredients_Min_Fields = {
  __typename?: 'recipe_ingredients_min_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Int']>;
  index?: Maybe<Scalars['Int']>;
  ingredient_id?: Maybe<Scalars['Int']>;
  recipe_id?: Maybe<Scalars['Int']>;
  section?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "recipe_ingredients" */
export type Recipe_Ingredients_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  ingredient_id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  section?: InputMaybe<Order_By>;
  unit?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recipe_ingredients" */
export type Recipe_Ingredients_Mutation_Response = {
  __typename?: 'recipe_ingredients_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipe_Ingredients>;
};

/** on_conflict condition type for table "recipe_ingredients" */
export type Recipe_Ingredients_On_Conflict = {
  constraint: Recipe_Ingredients_Constraint;
  update_columns?: Array<Recipe_Ingredients_Update_Column>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};

/** Ordering options when selecting data from "recipe_ingredients". */
export type Recipe_Ingredients_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  ingredient?: InputMaybe<Ingredients_Order_By>;
  ingredient_id?: InputMaybe<Order_By>;
  recipe?: InputMaybe<Recipes_Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  section?: InputMaybe<Order_By>;
  unit?: InputMaybe<Order_By>;
  unitByUnit?: InputMaybe<Units_Order_By>;
};

/** primary key columns input for table: recipe_ingredients */
export type Recipe_Ingredients_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "recipe_ingredients" */
export enum Recipe_Ingredients_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  Id = 'id',
  /** column name */
  Index = 'index',
  /** column name */
  IngredientId = 'ingredient_id',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  Section = 'section',
  /** column name */
  Unit = 'unit'
}

/** input type for updating data in table "recipe_ingredients" */
export type Recipe_Ingredients_Set_Input = {
  amount?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['Int']>;
  index?: InputMaybe<Scalars['Int']>;
  ingredient_id?: InputMaybe<Scalars['Int']>;
  recipe_id?: InputMaybe<Scalars['Int']>;
  section?: InputMaybe<Scalars['String']>;
  unit?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Recipe_Ingredients_Stddev_Fields = {
  __typename?: 'recipe_ingredients_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  index?: Maybe<Scalars['Float']>;
  ingredient_id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  unit?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "recipe_ingredients" */
export type Recipe_Ingredients_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  ingredient_id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  unit?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Recipe_Ingredients_Stddev_Pop_Fields = {
  __typename?: 'recipe_ingredients_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  index?: Maybe<Scalars['Float']>;
  ingredient_id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  unit?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "recipe_ingredients" */
export type Recipe_Ingredients_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  ingredient_id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  unit?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Recipe_Ingredients_Stddev_Samp_Fields = {
  __typename?: 'recipe_ingredients_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  index?: Maybe<Scalars['Float']>;
  ingredient_id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  unit?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "recipe_ingredients" */
export type Recipe_Ingredients_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  ingredient_id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  unit?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Recipe_Ingredients_Sum_Fields = {
  __typename?: 'recipe_ingredients_sum_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Int']>;
  index?: Maybe<Scalars['Int']>;
  ingredient_id?: Maybe<Scalars['Int']>;
  recipe_id?: Maybe<Scalars['Int']>;
  unit?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "recipe_ingredients" */
export type Recipe_Ingredients_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  ingredient_id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  unit?: InputMaybe<Order_By>;
};

/** update columns of table "recipe_ingredients" */
export enum Recipe_Ingredients_Update_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  Id = 'id',
  /** column name */
  Index = 'index',
  /** column name */
  IngredientId = 'ingredient_id',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  Section = 'section',
  /** column name */
  Unit = 'unit'
}

/** aggregate var_pop on columns */
export type Recipe_Ingredients_Var_Pop_Fields = {
  __typename?: 'recipe_ingredients_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  index?: Maybe<Scalars['Float']>;
  ingredient_id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  unit?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "recipe_ingredients" */
export type Recipe_Ingredients_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  ingredient_id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  unit?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Recipe_Ingredients_Var_Samp_Fields = {
  __typename?: 'recipe_ingredients_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  index?: Maybe<Scalars['Float']>;
  ingredient_id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  unit?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "recipe_ingredients" */
export type Recipe_Ingredients_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  ingredient_id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  unit?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Recipe_Ingredients_Variance_Fields = {
  __typename?: 'recipe_ingredients_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  index?: Maybe<Scalars['Float']>;
  ingredient_id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  unit?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "recipe_ingredients" */
export type Recipe_Ingredients_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  ingredient_id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  unit?: InputMaybe<Order_By>;
};

/** columns and relationships of "recipes" */
export type Recipes = {
  __typename?: 'recipes';
  cook_time?: Maybe<Scalars['interval']>;
  created_at: Scalars['timestamptz'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  portions: Scalars['Int'];
  prep_time?: Maybe<Scalars['interval']>;
  /** An array relationship */
  recipe_ingredients: Array<Recipe_Ingredients>;
  /** An aggregate relationship */
  recipe_ingredients_aggregate: Recipe_Ingredients_Aggregate;
  steps: Scalars['jsonb'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['String']>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_IngredientsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_Ingredients_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesStepsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "recipes" */
export type Recipes_Aggregate = {
  __typename?: 'recipes_aggregate';
  aggregate?: Maybe<Recipes_Aggregate_Fields>;
  nodes: Array<Recipes>;
};

/** aggregate fields of "recipes" */
export type Recipes_Aggregate_Fields = {
  __typename?: 'recipes_aggregate_fields';
  avg?: Maybe<Recipes_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Recipes_Max_Fields>;
  min?: Maybe<Recipes_Min_Fields>;
  stddev?: Maybe<Recipes_Stddev_Fields>;
  stddev_pop?: Maybe<Recipes_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recipes_Stddev_Samp_Fields>;
  sum?: Maybe<Recipes_Sum_Fields>;
  var_pop?: Maybe<Recipes_Var_Pop_Fields>;
  var_samp?: Maybe<Recipes_Var_Samp_Fields>;
  variance?: Maybe<Recipes_Variance_Fields>;
};


/** aggregate fields of "recipes" */
export type Recipes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "recipes" */
export type Recipes_Aggregate_Order_By = {
  avg?: InputMaybe<Recipes_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recipes_Max_Order_By>;
  min?: InputMaybe<Recipes_Min_Order_By>;
  stddev?: InputMaybe<Recipes_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Recipes_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Recipes_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Recipes_Sum_Order_By>;
  var_pop?: InputMaybe<Recipes_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Recipes_Var_Samp_Order_By>;
  variance?: InputMaybe<Recipes_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Recipes_Append_Input = {
  steps?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "recipes" */
export type Recipes_Arr_Rel_Insert_Input = {
  data: Array<Recipes_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Recipes_On_Conflict>;
};

/** aggregate avg on columns */
export type Recipes_Avg_Fields = {
  __typename?: 'recipes_avg_fields';
  id?: Maybe<Scalars['Float']>;
  portions?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "recipes" */
export type Recipes_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  portions?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "recipes". All fields are combined with a logical 'AND'. */
export type Recipes_Bool_Exp = {
  _and?: InputMaybe<Array<Recipes_Bool_Exp>>;
  _not?: InputMaybe<Recipes_Bool_Exp>;
  _or?: InputMaybe<Array<Recipes_Bool_Exp>>;
  cook_time?: InputMaybe<Interval_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  portions?: InputMaybe<Int_Comparison_Exp>;
  prep_time?: InputMaybe<Interval_Comparison_Exp>;
  recipe_ingredients?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
  steps?: InputMaybe<Jsonb_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipes" */
export enum Recipes_Constraint {
  /** unique or primary key constraint */
  RecipesPkey = 'recipes_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Recipes_Delete_At_Path_Input = {
  steps?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Recipes_Delete_Elem_Input = {
  steps?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Recipes_Delete_Key_Input = {
  steps?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "recipes" */
export type Recipes_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
  portions?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "recipes" */
export type Recipes_Insert_Input = {
  cook_time?: InputMaybe<Scalars['interval']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  portions?: InputMaybe<Scalars['Int']>;
  prep_time?: InputMaybe<Scalars['interval']>;
  recipe_ingredients?: InputMaybe<Recipe_Ingredients_Arr_Rel_Insert_Input>;
  steps?: InputMaybe<Scalars['jsonb']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Recipes_Max_Fields = {
  __typename?: 'recipes_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  portions?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "recipes" */
export type Recipes_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  portions?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recipes_Min_Fields = {
  __typename?: 'recipes_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  portions?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "recipes" */
export type Recipes_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  portions?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recipes" */
export type Recipes_Mutation_Response = {
  __typename?: 'recipes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipes>;
};

/** input type for inserting object relation for remote table "recipes" */
export type Recipes_Obj_Rel_Insert_Input = {
  data: Recipes_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Recipes_On_Conflict>;
};

/** on_conflict condition type for table "recipes" */
export type Recipes_On_Conflict = {
  constraint: Recipes_Constraint;
  update_columns?: Array<Recipes_Update_Column>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};

/** Ordering options when selecting data from "recipes". */
export type Recipes_Order_By = {
  cook_time?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  portions?: InputMaybe<Order_By>;
  prep_time?: InputMaybe<Order_By>;
  recipe_ingredients_aggregate?: InputMaybe<Recipe_Ingredients_Aggregate_Order_By>;
  steps?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipes */
export type Recipes_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Recipes_Prepend_Input = {
  steps?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "recipes" */
export enum Recipes_Select_Column {
  /** column name */
  CookTime = 'cook_time',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  Portions = 'portions',
  /** column name */
  PrepTime = 'prep_time',
  /** column name */
  Steps = 'steps',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "recipes" */
export type Recipes_Set_Input = {
  cook_time?: InputMaybe<Scalars['interval']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  portions?: InputMaybe<Scalars['Int']>;
  prep_time?: InputMaybe<Scalars['interval']>;
  steps?: InputMaybe<Scalars['jsonb']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user_id?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Recipes_Stddev_Fields = {
  __typename?: 'recipes_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  portions?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "recipes" */
export type Recipes_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  portions?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Recipes_Stddev_Pop_Fields = {
  __typename?: 'recipes_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  portions?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "recipes" */
export type Recipes_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  portions?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Recipes_Stddev_Samp_Fields = {
  __typename?: 'recipes_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  portions?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "recipes" */
export type Recipes_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  portions?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Recipes_Sum_Fields = {
  __typename?: 'recipes_sum_fields';
  id?: Maybe<Scalars['Int']>;
  portions?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "recipes" */
export type Recipes_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  portions?: InputMaybe<Order_By>;
};

/** update columns of table "recipes" */
export enum Recipes_Update_Column {
  /** column name */
  CookTime = 'cook_time',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  Portions = 'portions',
  /** column name */
  PrepTime = 'prep_time',
  /** column name */
  Steps = 'steps',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Recipes_Var_Pop_Fields = {
  __typename?: 'recipes_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  portions?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "recipes" */
export type Recipes_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  portions?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Recipes_Var_Samp_Fields = {
  __typename?: 'recipes_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  portions?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "recipes" */
export type Recipes_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  portions?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Recipes_Variance_Fields = {
  __typename?: 'recipes_variance_fields';
  id?: Maybe<Scalars['Float']>;
  portions?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "recipes" */
export type Recipes_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  portions?: InputMaybe<Order_By>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "ingredients" */
  ingredients: Array<Ingredients>;
  /** fetch aggregated fields from the table: "ingredients" */
  ingredients_aggregate: Ingredients_Aggregate;
  /** fetch data from the table: "ingredients" using primary key columns */
  ingredients_by_pk?: Maybe<Ingredients>;
  /** An array relationship */
  recipe_ingredients: Array<Recipe_Ingredients>;
  /** An aggregate relationship */
  recipe_ingredients_aggregate: Recipe_Ingredients_Aggregate;
  /** fetch data from the table: "recipe_ingredients" using primary key columns */
  recipe_ingredients_by_pk?: Maybe<Recipe_Ingredients>;
  /** An array relationship */
  recipes: Array<Recipes>;
  /** An aggregate relationship */
  recipes_aggregate: Recipes_Aggregate;
  /** fetch data from the table: "recipes" using primary key columns */
  recipes_by_pk?: Maybe<Recipes>;
  /** fetch data from the table: "tag" */
  tag: Array<Tag>;
  /** fetch aggregated fields from the table: "tag" */
  tag_aggregate: Tag_Aggregate;
  /** fetch data from the table: "tag" using primary key columns */
  tag_by_pk?: Maybe<Tag>;
  /** fetch data from the table: "units" */
  units: Array<Units>;
  /** fetch aggregated fields from the table: "units" */
  units_aggregate: Units_Aggregate;
  /** fetch data from the table: "units" using primary key columns */
  units_by_pk?: Maybe<Units>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Subscription_RootIngredientsArgs = {
  distinct_on?: InputMaybe<Array<Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ingredients_Order_By>>;
  where?: InputMaybe<Ingredients_Bool_Exp>;
};


export type Subscription_RootIngredients_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ingredients_Order_By>>;
  where?: InputMaybe<Ingredients_Bool_Exp>;
};


export type Subscription_RootIngredients_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootRecipe_IngredientsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};


export type Subscription_RootRecipe_Ingredients_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};


export type Subscription_RootRecipe_Ingredients_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootRecipesArgs = {
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


export type Subscription_RootRecipes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


export type Subscription_RootRecipes_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootTagArgs = {
  distinct_on?: InputMaybe<Array<Tag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tag_Order_By>>;
  where?: InputMaybe<Tag_Bool_Exp>;
};


export type Subscription_RootTag_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tag_Order_By>>;
  where?: InputMaybe<Tag_Bool_Exp>;
};


export type Subscription_RootTag_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootUnitsArgs = {
  distinct_on?: InputMaybe<Array<Units_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Units_Order_By>>;
  where?: InputMaybe<Units_Bool_Exp>;
};


export type Subscription_RootUnits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Units_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Units_Order_By>>;
  where?: InputMaybe<Units_Bool_Exp>;
};


export type Subscription_RootUnits_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};

/** columns and relationships of "tag" */
export type Tag = {
  __typename?: 'tag';
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  name: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "tag" */
export type Tag_Aggregate = {
  __typename?: 'tag_aggregate';
  aggregate?: Maybe<Tag_Aggregate_Fields>;
  nodes: Array<Tag>;
};

/** aggregate fields of "tag" */
export type Tag_Aggregate_Fields = {
  __typename?: 'tag_aggregate_fields';
  avg?: Maybe<Tag_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Tag_Max_Fields>;
  min?: Maybe<Tag_Min_Fields>;
  stddev?: Maybe<Tag_Stddev_Fields>;
  stddev_pop?: Maybe<Tag_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Tag_Stddev_Samp_Fields>;
  sum?: Maybe<Tag_Sum_Fields>;
  var_pop?: Maybe<Tag_Var_Pop_Fields>;
  var_samp?: Maybe<Tag_Var_Samp_Fields>;
  variance?: Maybe<Tag_Variance_Fields>;
};


/** aggregate fields of "tag" */
export type Tag_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Tag_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Tag_Avg_Fields = {
  __typename?: 'tag_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "tag". All fields are combined with a logical 'AND'. */
export type Tag_Bool_Exp = {
  _and?: InputMaybe<Array<Tag_Bool_Exp>>;
  _not?: InputMaybe<Tag_Bool_Exp>;
  _or?: InputMaybe<Array<Tag_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "tag" */
export enum Tag_Constraint {
  /** unique or primary key constraint */
  TagsPkey = 'tags_pkey'
}

/** input type for incrementing numeric columns in table "tag" */
export type Tag_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "tag" */
export type Tag_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Tag_Max_Fields = {
  __typename?: 'tag_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Tag_Min_Fields = {
  __typename?: 'tag_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "tag" */
export type Tag_Mutation_Response = {
  __typename?: 'tag_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Tag>;
};

/** on_conflict condition type for table "tag" */
export type Tag_On_Conflict = {
  constraint: Tag_Constraint;
  update_columns?: Array<Tag_Update_Column>;
  where?: InputMaybe<Tag_Bool_Exp>;
};

/** Ordering options when selecting data from "tag". */
export type Tag_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: tag */
export type Tag_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "tag" */
export enum Tag_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "tag" */
export type Tag_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Tag_Stddev_Fields = {
  __typename?: 'tag_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Tag_Stddev_Pop_Fields = {
  __typename?: 'tag_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Tag_Stddev_Samp_Fields = {
  __typename?: 'tag_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Tag_Sum_Fields = {
  __typename?: 'tag_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "tag" */
export enum Tag_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Tag_Var_Pop_Fields = {
  __typename?: 'tag_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Tag_Var_Samp_Fields = {
  __typename?: 'tag_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Tag_Variance_Fields = {
  __typename?: 'tag_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "units" */
export type Units = {
  __typename?: 'units';
  id: Scalars['Int'];
  long_name: Scalars['String'];
  /** An array relationship */
  recipe_ingredients: Array<Recipe_Ingredients>;
  /** An aggregate relationship */
  recipe_ingredients_aggregate: Recipe_Ingredients_Aggregate;
  short_name: Scalars['String'];
};


/** columns and relationships of "units" */
export type UnitsRecipe_IngredientsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};


/** columns and relationships of "units" */
export type UnitsRecipe_Ingredients_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};

/** aggregated selection of "units" */
export type Units_Aggregate = {
  __typename?: 'units_aggregate';
  aggregate?: Maybe<Units_Aggregate_Fields>;
  nodes: Array<Units>;
};

/** aggregate fields of "units" */
export type Units_Aggregate_Fields = {
  __typename?: 'units_aggregate_fields';
  avg?: Maybe<Units_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Units_Max_Fields>;
  min?: Maybe<Units_Min_Fields>;
  stddev?: Maybe<Units_Stddev_Fields>;
  stddev_pop?: Maybe<Units_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Units_Stddev_Samp_Fields>;
  sum?: Maybe<Units_Sum_Fields>;
  var_pop?: Maybe<Units_Var_Pop_Fields>;
  var_samp?: Maybe<Units_Var_Samp_Fields>;
  variance?: Maybe<Units_Variance_Fields>;
};


/** aggregate fields of "units" */
export type Units_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Units_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Units_Avg_Fields = {
  __typename?: 'units_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "units". All fields are combined with a logical 'AND'. */
export type Units_Bool_Exp = {
  _and?: InputMaybe<Array<Units_Bool_Exp>>;
  _not?: InputMaybe<Units_Bool_Exp>;
  _or?: InputMaybe<Array<Units_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  long_name?: InputMaybe<String_Comparison_Exp>;
  recipe_ingredients?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
  short_name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "units" */
export enum Units_Constraint {
  /** unique or primary key constraint */
  UnitsPkey = 'units_pkey'
}

/** input type for incrementing numeric columns in table "units" */
export type Units_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "units" */
export type Units_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>;
  long_name?: InputMaybe<Scalars['String']>;
  recipe_ingredients?: InputMaybe<Recipe_Ingredients_Arr_Rel_Insert_Input>;
  short_name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Units_Max_Fields = {
  __typename?: 'units_max_fields';
  id?: Maybe<Scalars['Int']>;
  long_name?: Maybe<Scalars['String']>;
  short_name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Units_Min_Fields = {
  __typename?: 'units_min_fields';
  id?: Maybe<Scalars['Int']>;
  long_name?: Maybe<Scalars['String']>;
  short_name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "units" */
export type Units_Mutation_Response = {
  __typename?: 'units_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Units>;
};

/** input type for inserting object relation for remote table "units" */
export type Units_Obj_Rel_Insert_Input = {
  data: Units_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Units_On_Conflict>;
};

/** on_conflict condition type for table "units" */
export type Units_On_Conflict = {
  constraint: Units_Constraint;
  update_columns?: Array<Units_Update_Column>;
  where?: InputMaybe<Units_Bool_Exp>;
};

/** Ordering options when selecting data from "units". */
export type Units_Order_By = {
  id?: InputMaybe<Order_By>;
  long_name?: InputMaybe<Order_By>;
  recipe_ingredients_aggregate?: InputMaybe<Recipe_Ingredients_Aggregate_Order_By>;
  short_name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: units */
export type Units_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "units" */
export enum Units_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LongName = 'long_name',
  /** column name */
  ShortName = 'short_name'
}

/** input type for updating data in table "units" */
export type Units_Set_Input = {
  id?: InputMaybe<Scalars['Int']>;
  long_name?: InputMaybe<Scalars['String']>;
  short_name?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Units_Stddev_Fields = {
  __typename?: 'units_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Units_Stddev_Pop_Fields = {
  __typename?: 'units_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Units_Stddev_Samp_Fields = {
  __typename?: 'units_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Units_Sum_Fields = {
  __typename?: 'units_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "units" */
export enum Units_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LongName = 'long_name',
  /** column name */
  ShortName = 'short_name'
}

/** aggregate var_pop on columns */
export type Units_Var_Pop_Fields = {
  __typename?: 'units_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Units_Var_Samp_Fields = {
  __typename?: 'units_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Units_Variance_Fields = {
  __typename?: 'units_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  created_at: Scalars['timestamptz'];
  id: Scalars['String'];
  name: Scalars['String'];
  /** An array relationship */
  recipes: Array<Recipes>;
  /** An aggregate relationship */
  recipes_aggregate: Recipes_Aggregate;
  updated_at?: Maybe<Scalars['timestamptz']>;
};


/** columns and relationships of "users" */
export type UsersRecipesArgs = {
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersRecipes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  recipes?: InputMaybe<Recipes_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  recipes?: InputMaybe<Recipes_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  recipes_aggregate?: InputMaybe<Recipes_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type GetIngredientsAndUnitsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetIngredientsAndUnitsQuery = { __typename?: 'query_root', ingredients: Array<{ __typename?: 'ingredients', name: string, id: number }>, units: Array<{ __typename?: 'units', id: number, long_name: string, short_name: string }> };

export type GetAllRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRecipesQuery = { __typename?: 'query_root', recipes: Array<{ __typename?: 'recipes', description?: string | null, id: number, name: string, image?: string | null }> };

export type GetRecipeByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetRecipeByIdQuery = { __typename?: 'query_root', recipes_by_pk?: { __typename?: 'recipes', id: number, name: string, description?: string | null, image?: string | null, steps: any, prep_time?: any | null, cook_time?: any | null, portions: number, user?: { __typename?: 'users', name: string } | null, recipe_ingredients: Array<{ __typename?: 'recipe_ingredients', id: number, index: number, amount: number, section?: string | null, ingredient: { __typename?: 'ingredients', id: number, name: string }, unitByUnit: { __typename?: 'units', id: number, long_name: string, short_name: string } }> } | null };

export type CreateRecipeMutationVariables = Exact<{
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  steps?: InputMaybe<Scalars['jsonb']>;
  data: Array<Recipe_Ingredients_Insert_Input> | Recipe_Ingredients_Insert_Input;
  image?: InputMaybe<Scalars['String']>;
  prep_time?: InputMaybe<Scalars['interval']>;
  cook_time?: InputMaybe<Scalars['interval']>;
  portions: Scalars['Int'];
}>;


export type CreateRecipeMutation = { __typename?: 'mutation_root', insert_recipes_one?: { __typename?: 'recipes', id: number, description?: string | null, name: string, steps: any, image?: string | null, prep_time?: any | null, cook_time?: any | null, portions: number, recipe_ingredients: Array<{ __typename?: 'recipe_ingredients', amount: number, ingredient_id: number, unit: number, index: number, section?: string | null }> } | null };

export type EditRecipeMutationVariables = Exact<{
  recipe_id: Scalars['Int'];
  delete_not_in: Array<Scalars['Int']> | Scalars['Int'];
  insert: Array<Recipe_Ingredients_Insert_Input> | Recipe_Ingredients_Insert_Input;
  update: Array<Recipe_Ingredients_Insert_Input> | Recipe_Ingredients_Insert_Input;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  steps?: InputMaybe<Scalars['jsonb']>;
  image?: InputMaybe<Scalars['String']>;
  prep_time?: InputMaybe<Scalars['interval']>;
  cook_time?: InputMaybe<Scalars['interval']>;
  portions: Scalars['Int'];
}>;


export type EditRecipeMutation = { __typename?: 'mutation_root', delete_recipe_ingredients?: { __typename?: 'recipe_ingredients_mutation_response', affected_rows: number } | null, update_recipes_by_pk?: { __typename?: 'recipes', id: number } | null, update_ingredients?: { __typename?: 'recipe_ingredients_mutation_response', affected_rows: number } | null, insert_ingredients?: { __typename?: 'recipe_ingredients_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'recipe_ingredients', id: number }> } | null };

export type DeleteRecipeMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteRecipeMutation = { __typename?: 'mutation_root', delete_recipes_by_pk?: { __typename?: 'recipes', name: string } | null };


declare module '*/ingredients.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getIngredientsAndUnits: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/recipes.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getAllRecipes: DocumentNode;
export const getRecipeById: DocumentNode;
export const createRecipe: DocumentNode;
export const editRecipe: DocumentNode;
export const deleteRecipe: DocumentNode;

  export default defaultDocument;
}
    

export const GetIngredientsAndUnits = gql`
    query getIngredientsAndUnits {
  ingredients {
    name
    id
  }
  units {
    id
    long_name
    short_name
  }
}
    `;
export const GetAllRecipes = gql`
    query getAllRecipes {
  recipes(order_by: {created_at: desc}) {
    description
    id
    name
    image
  }
}
    `;
export const GetRecipeById = gql`
    query getRecipeById($id: Int!) {
  recipes_by_pk(id: $id) {
    id
    name
    description
    image
    steps
    prep_time
    cook_time
    portions
    user {
      name
    }
    recipe_ingredients {
      id
      index
      amount
      section
      ingredient {
        id
        name
      }
      unitByUnit {
        id
        long_name
        short_name
      }
    }
  }
}
    `;
export const CreateRecipe = gql`
    mutation createRecipe($description: String, $name: String, $steps: jsonb, $data: [recipe_ingredients_insert_input!]!, $image: String, $prep_time: interval, $cook_time: interval, $portions: Int!) {
  insert_recipes_one(
    object: {description: $description, name: $name, steps: $steps, recipe_ingredients: {data: $data}, image: $image, prep_time: $prep_time, cook_time: $cook_time, portions: $portions}
  ) {
    id
    description
    name
    steps
    image
    prep_time
    cook_time
    portions
    recipe_ingredients {
      amount
      ingredient_id
      unit
      index
      section
    }
  }
}
    `;
export const EditRecipe = gql`
    mutation editRecipe($recipe_id: Int!, $delete_not_in: [Int!]!, $insert: [recipe_ingredients_insert_input!]!, $update: [recipe_ingredients_insert_input!]!, $description: String, $name: String, $steps: jsonb, $image: String = "", $prep_time: interval, $cook_time: interval, $portions: Int!) {
  delete_recipe_ingredients(
    where: {recipe_id: {_eq: $recipe_id}, id: {_nin: $delete_not_in}}
  ) {
    affected_rows
  }
  update_recipes_by_pk(
    pk_columns: {id: $recipe_id}
    _set: {image: $image, name: $name, description: $description, steps: $steps, prep_time: $prep_time, cook_time: $cook_time, portions: $portions}
  ) {
    id
  }
  update_ingredients: insert_recipe_ingredients(
    objects: $update
    on_conflict: {constraint: recipe_ingredients_pkey, update_columns: [amount, unit, index, section]}
  ) {
    affected_rows
  }
  insert_ingredients: insert_recipe_ingredients(objects: $insert) {
    returning {
      id
    }
    affected_rows
  }
}
    `;
export const DeleteRecipe = gql`
    mutation deleteRecipe($id: Int!) {
  delete_recipes_by_pk(id: $id) {
    name
  }
}
    `;