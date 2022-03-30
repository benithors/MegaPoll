/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  Cursor: any;
  Date: any;
  Datetime: any;
  JSON: any;
  Time: any;
  UUID: any;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars["BigInt"]>;
  gt?: InputMaybe<Scalars["BigInt"]>;
  gte?: InputMaybe<Scalars["BigInt"]>;
  lt?: InputMaybe<Scalars["BigInt"]>;
  lte?: InputMaybe<Scalars["BigInt"]>;
  neq?: InputMaybe<Scalars["BigInt"]>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars["Boolean"]>;
  gt?: InputMaybe<Scalars["Boolean"]>;
  gte?: InputMaybe<Scalars["Boolean"]>;
  lt?: InputMaybe<Scalars["Boolean"]>;
  lte?: InputMaybe<Scalars["Boolean"]>;
  neq?: InputMaybe<Scalars["Boolean"]>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars["Date"]>;
  gt?: InputMaybe<Scalars["Date"]>;
  gte?: InputMaybe<Scalars["Date"]>;
  lt?: InputMaybe<Scalars["Date"]>;
  lte?: InputMaybe<Scalars["Date"]>;
  neq?: InputMaybe<Scalars["Date"]>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars["Datetime"]>;
  gt?: InputMaybe<Scalars["Datetime"]>;
  gte?: InputMaybe<Scalars["Datetime"]>;
  lt?: InputMaybe<Scalars["Datetime"]>;
  lte?: InputMaybe<Scalars["Datetime"]>;
  neq?: InputMaybe<Scalars["Datetime"]>;
};

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars["Float"]>;
  gt?: InputMaybe<Scalars["Float"]>;
  gte?: InputMaybe<Scalars["Float"]>;
  lt?: InputMaybe<Scalars["Float"]>;
  lte?: InputMaybe<Scalars["Float"]>;
  neq?: InputMaybe<Scalars["Float"]>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars["Int"]>;
  gt?: InputMaybe<Scalars["Int"]>;
  gte?: InputMaybe<Scalars["Int"]>;
  lt?: InputMaybe<Scalars["Int"]>;
  lte?: InputMaybe<Scalars["Int"]>;
  neq?: InputMaybe<Scalars["Int"]>;
};

/** Boolean expression comparing fields on type "JSON" */
export type JsonFilter = {
  eq?: InputMaybe<Scalars["JSON"]>;
  neq?: InputMaybe<Scalars["JSON"]>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: "Mutation";
  /** Deletes zero or more records from the collection */
  deleteFromextended_profilesCollection: Extended_ProfilesDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFrompoll_instancesCollection: Poll_InstancesDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFrompoll_option_votesCollection: Poll_Option_VotesDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFrompoll_option_votes_2_usersCollection: Poll_Option_Votes_2_UsersDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFrompoll_optionsCollection: Poll_OptionsDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFrompoll_questionsCollection: Poll_QuestionsDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFrompoll_templatesCollection: Poll_TemplatesDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFromprofilesCollection: ProfilesDeleteResponse;
  /** Adds one or more `extended_profilesInsertResponse` records to the collection */
  insertIntoextended_profilesCollection?: Maybe<Extended_ProfilesInsertResponse>;
  /** Adds one or more `poll_instancesInsertResponse` records to the collection */
  insertIntopoll_instancesCollection?: Maybe<Poll_InstancesInsertResponse>;
  /** Adds one or more `poll_option_votesInsertResponse` records to the collection */
  insertIntopoll_option_votesCollection?: Maybe<Poll_Option_VotesInsertResponse>;
  /** Adds one or more `poll_option_votes_2_usersInsertResponse` records to the collection */
  insertIntopoll_option_votes_2_usersCollection?: Maybe<Poll_Option_Votes_2_UsersInsertResponse>;
  /** Adds one or more `poll_optionsInsertResponse` records to the collection */
  insertIntopoll_optionsCollection?: Maybe<Poll_OptionsInsertResponse>;
  /** Adds one or more `poll_questionsInsertResponse` records to the collection */
  insertIntopoll_questionsCollection?: Maybe<Poll_QuestionsInsertResponse>;
  /** Adds one or more `poll_templatesInsertResponse` records to the collection */
  insertIntopoll_templatesCollection?: Maybe<Poll_TemplatesInsertResponse>;
  /** Adds one or more `profilesInsertResponse` records to the collection */
  insertIntoprofilesCollection?: Maybe<ProfilesInsertResponse>;
  /** Updates zero or more records in the collection */
  updateextended_profilesCollection: Extended_ProfilesUpdateResponse;
  /** Updates zero or more records in the collection */
  updatepoll_instancesCollection: Poll_InstancesUpdateResponse;
  /** Updates zero or more records in the collection */
  updatepoll_option_votesCollection: Poll_Option_VotesUpdateResponse;
  /** Updates zero or more records in the collection */
  updatepoll_option_votes_2_usersCollection: Poll_Option_Votes_2_UsersUpdateResponse;
  /** Updates zero or more records in the collection */
  updatepoll_optionsCollection: Poll_OptionsUpdateResponse;
  /** Updates zero or more records in the collection */
  updatepoll_questionsCollection: Poll_QuestionsUpdateResponse;
  /** Updates zero or more records in the collection */
  updatepoll_templatesCollection: Poll_TemplatesUpdateResponse;
  /** Updates zero or more records in the collection */
  updateprofilesCollection: ProfilesUpdateResponse;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromextended_ProfilesCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<Extended_ProfilesFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFrompoll_InstancesCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<Poll_InstancesFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFrompoll_Option_VotesCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<Poll_Option_VotesFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFrompoll_Option_Votes_2_UsersCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<Poll_Option_Votes_2_UsersFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFrompoll_OptionsCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<Poll_OptionsFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFrompoll_QuestionsCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<Poll_QuestionsFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFrompoll_TemplatesCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<Poll_TemplatesFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromprofilesCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<ProfilesFilter>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoextended_ProfilesCollectionArgs = {
  objects: Array<Extended_ProfilesInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntopoll_InstancesCollectionArgs = {
  objects: Array<Poll_InstancesInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntopoll_Option_VotesCollectionArgs = {
  objects: Array<Poll_Option_VotesInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntopoll_Option_Votes_2_UsersCollectionArgs = {
  objects: Array<Poll_Option_Votes_2_UsersInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntopoll_OptionsCollectionArgs = {
  objects: Array<Poll_OptionsInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntopoll_QuestionsCollectionArgs = {
  objects: Array<Poll_QuestionsInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntopoll_TemplatesCollectionArgs = {
  objects: Array<Poll_TemplatesInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoprofilesCollectionArgs = {
  objects: Array<ProfilesInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationUpdateextended_ProfilesCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<Extended_ProfilesFilter>;
  set: Extended_ProfilesUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatepoll_InstancesCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<Poll_InstancesFilter>;
  set: Poll_InstancesUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatepoll_Option_VotesCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<Poll_Option_VotesFilter>;
  set: Poll_Option_VotesUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatepoll_Option_Votes_2_UsersCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<Poll_Option_Votes_2_UsersFilter>;
  set: Poll_Option_Votes_2_UsersUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatepoll_OptionsCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<Poll_OptionsFilter>;
  set: Poll_OptionsUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatepoll_QuestionsCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<Poll_QuestionsFilter>;
  set: Poll_QuestionsUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatepoll_TemplatesCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<Poll_TemplatesFilter>;
  set: Poll_TemplatesUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateprofilesCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<ProfilesFilter>;
  set: ProfilesUpdateInput;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  AscNullsFirst = "AscNullsFirst",
  AscNullsLast = "AscNullsLast",
  DescNullsFirst = "DescNullsFirst",
  DescNullsLast = "DescNullsLast",
}

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]>;
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  startCursor?: Maybe<Scalars["String"]>;
};

/** The root type for querying data */
export type Query = {
  __typename?: "Query";
  /** A pagable collection of type `extended_profiles` */
  extended_profilesCollection?: Maybe<Extended_ProfilesConnection>;
  /** A pagable collection of type `poll_instances` */
  poll_instancesCollection?: Maybe<Poll_InstancesConnection>;
  /** A pagable collection of type `poll_option_votes` */
  poll_option_votesCollection?: Maybe<Poll_Option_VotesConnection>;
  /** A pagable collection of type `poll_option_votes_2_users` */
  poll_option_votes_2_usersCollection?: Maybe<Poll_Option_Votes_2_UsersConnection>;
  /** A pagable collection of type `poll_options` */
  poll_optionsCollection?: Maybe<Poll_OptionsConnection>;
  /** A pagable collection of type `poll_questions` */
  poll_questionsCollection?: Maybe<Poll_QuestionsConnection>;
  /** A pagable collection of type `poll_templates` */
  poll_templatesCollection?: Maybe<Poll_TemplatesConnection>;
  /** A pagable collection of type `profiles` */
  profilesCollection?: Maybe<ProfilesConnection>;
};

/** The root type for querying data */
export type QueryExtended_ProfilesCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<Extended_ProfilesFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<Extended_ProfilesOrderBy>>;
};

/** The root type for querying data */
export type QueryPoll_InstancesCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<Poll_InstancesFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<Poll_InstancesOrderBy>>;
};

/** The root type for querying data */
export type QueryPoll_Option_VotesCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<Poll_Option_VotesFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<Poll_Option_VotesOrderBy>>;
};

/** The root type for querying data */
export type QueryPoll_Option_Votes_2_UsersCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<Poll_Option_Votes_2_UsersFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<Poll_Option_Votes_2_UsersOrderBy>>;
};

/** The root type for querying data */
export type QueryPoll_OptionsCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<Poll_OptionsFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<Poll_OptionsOrderBy>>;
};

/** The root type for querying data */
export type QueryPoll_QuestionsCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<Poll_QuestionsFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<Poll_QuestionsOrderBy>>;
};

/** The root type for querying data */
export type QueryPoll_TemplatesCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<Poll_TemplatesFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<Poll_TemplatesOrderBy>>;
};

/** The root type for querying data */
export type QueryProfilesCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<ProfilesFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<ProfilesOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars["String"]>;
  gt?: InputMaybe<Scalars["String"]>;
  gte?: InputMaybe<Scalars["String"]>;
  lt?: InputMaybe<Scalars["String"]>;
  lte?: InputMaybe<Scalars["String"]>;
  neq?: InputMaybe<Scalars["String"]>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars["Time"]>;
  gt?: InputMaybe<Scalars["Time"]>;
  gte?: InputMaybe<Scalars["Time"]>;
  lt?: InputMaybe<Scalars["Time"]>;
  lte?: InputMaybe<Scalars["Time"]>;
  neq?: InputMaybe<Scalars["Time"]>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars["UUID"]>;
  neq?: InputMaybe<Scalars["UUID"]>;
};

export type Extended_Profiles = {
  __typename?: "extended_profiles";
  followers?: Maybe<Scalars["BigInt"]>;
  id: Scalars["BigInt"];
  profile: Scalars["BigInt"];
  profiles?: Maybe<Profiles>;
};

export type Extended_ProfilesConnection = {
  __typename?: "extended_profilesConnection";
  edges: Array<Extended_ProfilesEdge>;
  pageInfo: PageInfo;
};

export type Extended_ProfilesDeleteResponse = {
  __typename?: "extended_profilesDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Extended_Profiles>;
};

export type Extended_ProfilesEdge = {
  __typename?: "extended_profilesEdge";
  cursor: Scalars["String"];
  node?: Maybe<Extended_Profiles>;
};

export type Extended_ProfilesFilter = {
  followers?: InputMaybe<BigIntFilter>;
  id?: InputMaybe<BigIntFilter>;
  profile?: InputMaybe<BigIntFilter>;
};

export type Extended_ProfilesInsertInput = {
  followers?: InputMaybe<Scalars["BigInt"]>;
  profile?: InputMaybe<Scalars["BigInt"]>;
};

export type Extended_ProfilesInsertResponse = {
  __typename?: "extended_profilesInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Extended_Profiles>;
};

export type Extended_ProfilesOrderBy = {
  followers?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  profile?: InputMaybe<OrderByDirection>;
};

export type Extended_ProfilesUpdateInput = {
  followers?: InputMaybe<Scalars["BigInt"]>;
  profile?: InputMaybe<Scalars["BigInt"]>;
};

export type Extended_ProfilesUpdateResponse = {
  __typename?: "extended_profilesUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Extended_Profiles>;
};

export type Poll_Instances = {
  __typename?: "poll_instances";
  id: Scalars["String"];
  poll_option_votesCollection?: Maybe<Poll_Option_VotesConnection>;
};

export type Poll_InstancesPoll_Option_VotesCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<Poll_Option_VotesFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<Poll_Option_VotesOrderBy>>;
};

export type Poll_InstancesConnection = {
  __typename?: "poll_instancesConnection";
  edges: Array<Poll_InstancesEdge>;
  pageInfo: PageInfo;
};

export type Poll_InstancesDeleteResponse = {
  __typename?: "poll_instancesDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Poll_Instances>;
};

export type Poll_InstancesEdge = {
  __typename?: "poll_instancesEdge";
  cursor: Scalars["String"];
  node?: Maybe<Poll_Instances>;
};

export type Poll_InstancesFilter = {
  id?: InputMaybe<StringFilter>;
};

export type Poll_InstancesInsertInput = {
  id?: InputMaybe<Scalars["String"]>;
};

export type Poll_InstancesInsertResponse = {
  __typename?: "poll_instancesInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Poll_Instances>;
};

export type Poll_InstancesOrderBy = {
  id?: InputMaybe<OrderByDirection>;
};

export type Poll_InstancesUpdateInput = {
  id?: InputMaybe<Scalars["String"]>;
};

export type Poll_InstancesUpdateResponse = {
  __typename?: "poll_instancesUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Poll_Instances>;
};

export type Poll_Option_Votes = {
  __typename?: "poll_option_votes";
  id: Scalars["BigInt"];
  poll_instance: Scalars["String"];
  poll_instances?: Maybe<Poll_Instances>;
  poll_option: Scalars["BigInt"];
  poll_option_votes_2_usersCollection?: Maybe<Poll_Option_Votes_2_UsersConnection>;
  poll_options?: Maybe<Poll_Options>;
  votes: Scalars["BigInt"];
};

export type Poll_Option_VotesPoll_Option_Votes_2_UsersCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<Poll_Option_Votes_2_UsersFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<Poll_Option_Votes_2_UsersOrderBy>>;
};

export type Poll_Option_VotesConnection = {
  __typename?: "poll_option_votesConnection";
  edges: Array<Poll_Option_VotesEdge>;
  pageInfo: PageInfo;
};

export type Poll_Option_VotesDeleteResponse = {
  __typename?: "poll_option_votesDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Poll_Option_Votes>;
};

export type Poll_Option_VotesEdge = {
  __typename?: "poll_option_votesEdge";
  cursor: Scalars["String"];
  node?: Maybe<Poll_Option_Votes>;
};

export type Poll_Option_VotesFilter = {
  id?: InputMaybe<BigIntFilter>;
  poll_instance?: InputMaybe<StringFilter>;
  poll_option?: InputMaybe<BigIntFilter>;
  votes?: InputMaybe<BigIntFilter>;
};

export type Poll_Option_VotesInsertInput = {
  poll_instance?: InputMaybe<Scalars["String"]>;
  poll_option?: InputMaybe<Scalars["BigInt"]>;
  votes?: InputMaybe<Scalars["BigInt"]>;
};

export type Poll_Option_VotesInsertResponse = {
  __typename?: "poll_option_votesInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Poll_Option_Votes>;
};

export type Poll_Option_VotesOrderBy = {
  id?: InputMaybe<OrderByDirection>;
  poll_instance?: InputMaybe<OrderByDirection>;
  poll_option?: InputMaybe<OrderByDirection>;
  votes?: InputMaybe<OrderByDirection>;
};

export type Poll_Option_VotesUpdateInput = {
  poll_instance?: InputMaybe<Scalars["String"]>;
  poll_option?: InputMaybe<Scalars["BigInt"]>;
  votes?: InputMaybe<Scalars["BigInt"]>;
};

export type Poll_Option_VotesUpdateResponse = {
  __typename?: "poll_option_votesUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Poll_Option_Votes>;
};

export type Poll_Option_Votes_2_Users = {
  __typename?: "poll_option_votes_2_users";
  id: Scalars["BigInt"];
  poll_option_vote: Scalars["BigInt"];
  poll_option_votes?: Maybe<Poll_Option_Votes>;
  profile?: Maybe<Scalars["BigInt"]>;
  profiles?: Maybe<Profiles>;
  user_cookie?: Maybe<Scalars["UUID"]>;
};

export type Poll_Option_Votes_2_UsersConnection = {
  __typename?: "poll_option_votes_2_usersConnection";
  edges: Array<Poll_Option_Votes_2_UsersEdge>;
  pageInfo: PageInfo;
};

export type Poll_Option_Votes_2_UsersDeleteResponse = {
  __typename?: "poll_option_votes_2_usersDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Poll_Option_Votes_2_Users>;
};

export type Poll_Option_Votes_2_UsersEdge = {
  __typename?: "poll_option_votes_2_usersEdge";
  cursor: Scalars["String"];
  node?: Maybe<Poll_Option_Votes_2_Users>;
};

export type Poll_Option_Votes_2_UsersFilter = {
  id?: InputMaybe<BigIntFilter>;
  poll_option_vote?: InputMaybe<BigIntFilter>;
  profile?: InputMaybe<BigIntFilter>;
  user_cookie?: InputMaybe<UuidFilter>;
};

export type Poll_Option_Votes_2_UsersInsertInput = {
  poll_option_vote?: InputMaybe<Scalars["BigInt"]>;
  profile?: InputMaybe<Scalars["BigInt"]>;
  user_cookie?: InputMaybe<Scalars["UUID"]>;
};

export type Poll_Option_Votes_2_UsersInsertResponse = {
  __typename?: "poll_option_votes_2_usersInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Poll_Option_Votes_2_Users>;
};

export type Poll_Option_Votes_2_UsersOrderBy = {
  id?: InputMaybe<OrderByDirection>;
  poll_option_vote?: InputMaybe<OrderByDirection>;
  profile?: InputMaybe<OrderByDirection>;
  user_cookie?: InputMaybe<OrderByDirection>;
};

export type Poll_Option_Votes_2_UsersUpdateInput = {
  poll_option_vote?: InputMaybe<Scalars["BigInt"]>;
  profile?: InputMaybe<Scalars["BigInt"]>;
  user_cookie?: InputMaybe<Scalars["UUID"]>;
};

export type Poll_Option_Votes_2_UsersUpdateResponse = {
  __typename?: "poll_option_votes_2_usersUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Poll_Option_Votes_2_Users>;
};

export type Poll_Options = {
  __typename?: "poll_options";
  id: Scalars["BigInt"];
  option: Scalars["String"];
  poll_option_votesCollection?: Maybe<Poll_Option_VotesConnection>;
  poll_question: Scalars["BigInt"];
  poll_questions?: Maybe<Poll_Questions>;
};

export type Poll_OptionsPoll_Option_VotesCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<Poll_Option_VotesFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<Poll_Option_VotesOrderBy>>;
};

export type Poll_OptionsConnection = {
  __typename?: "poll_optionsConnection";
  edges: Array<Poll_OptionsEdge>;
  pageInfo: PageInfo;
};

export type Poll_OptionsDeleteResponse = {
  __typename?: "poll_optionsDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Poll_Options>;
};

export type Poll_OptionsEdge = {
  __typename?: "poll_optionsEdge";
  cursor: Scalars["String"];
  node?: Maybe<Poll_Options>;
};

export type Poll_OptionsFilter = {
  id?: InputMaybe<BigIntFilter>;
  option?: InputMaybe<StringFilter>;
  poll_question?: InputMaybe<BigIntFilter>;
};

export type Poll_OptionsInsertInput = {
  option?: InputMaybe<Scalars["String"]>;
  poll_question?: InputMaybe<Scalars["BigInt"]>;
};

export type Poll_OptionsInsertResponse = {
  __typename?: "poll_optionsInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Poll_Options>;
};

export type Poll_OptionsOrderBy = {
  id?: InputMaybe<OrderByDirection>;
  option?: InputMaybe<OrderByDirection>;
  poll_question?: InputMaybe<OrderByDirection>;
};

export type Poll_OptionsUpdateInput = {
  option?: InputMaybe<Scalars["String"]>;
  poll_question?: InputMaybe<Scalars["BigInt"]>;
};

export type Poll_OptionsUpdateResponse = {
  __typename?: "poll_optionsUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Poll_Options>;
};

export type Poll_Questions = {
  __typename?: "poll_questions";
  id: Scalars["BigInt"];
  multipoll: Scalars["Boolean"];
  poll_optionsCollection?: Maybe<Poll_OptionsConnection>;
  poll_template: Scalars["BigInt"];
  poll_templates?: Maybe<Poll_Templates>;
  question: Scalars["String"];
};

export type Poll_QuestionsPoll_OptionsCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<Poll_OptionsFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<Poll_OptionsOrderBy>>;
};

export type Poll_QuestionsConnection = {
  __typename?: "poll_questionsConnection";
  edges: Array<Poll_QuestionsEdge>;
  pageInfo: PageInfo;
};

export type Poll_QuestionsDeleteResponse = {
  __typename?: "poll_questionsDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Poll_Questions>;
};

export type Poll_QuestionsEdge = {
  __typename?: "poll_questionsEdge";
  cursor: Scalars["String"];
  node?: Maybe<Poll_Questions>;
};

export type Poll_QuestionsFilter = {
  id?: InputMaybe<BigIntFilter>;
  multipoll?: InputMaybe<BooleanFilter>;
  poll_template?: InputMaybe<BigIntFilter>;
  question?: InputMaybe<StringFilter>;
};

export type Poll_QuestionsInsertInput = {
  multipoll?: InputMaybe<Scalars["Boolean"]>;
  poll_template?: InputMaybe<Scalars["BigInt"]>;
  question?: InputMaybe<Scalars["String"]>;
};

export type Poll_QuestionsInsertResponse = {
  __typename?: "poll_questionsInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Poll_Questions>;
};

export type Poll_QuestionsOrderBy = {
  id?: InputMaybe<OrderByDirection>;
  multipoll?: InputMaybe<OrderByDirection>;
  poll_template?: InputMaybe<OrderByDirection>;
  question?: InputMaybe<OrderByDirection>;
};

export type Poll_QuestionsUpdateInput = {
  multipoll?: InputMaybe<Scalars["Boolean"]>;
  poll_template?: InputMaybe<Scalars["BigInt"]>;
  question?: InputMaybe<Scalars["String"]>;
};

export type Poll_QuestionsUpdateResponse = {
  __typename?: "poll_questionsUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Poll_Questions>;
};

export type Poll_Templates = {
  __typename?: "poll_templates";
  cover_image?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["Datetime"]>;
  id: Scalars["BigInt"];
  poll_description: Scalars["String"];
  poll_name: Scalars["String"];
  poll_questionsCollection?: Maybe<Poll_QuestionsConnection>;
};

export type Poll_TemplatesPoll_QuestionsCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<Poll_QuestionsFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<Poll_QuestionsOrderBy>>;
};

export type Poll_TemplatesConnection = {
  __typename?: "poll_templatesConnection";
  edges: Array<Poll_TemplatesEdge>;
  pageInfo: PageInfo;
};

export type Poll_TemplatesDeleteResponse = {
  __typename?: "poll_templatesDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Poll_Templates>;
};

export type Poll_TemplatesEdge = {
  __typename?: "poll_templatesEdge";
  cursor: Scalars["String"];
  node?: Maybe<Poll_Templates>;
};

export type Poll_TemplatesFilter = {
  cover_image?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  poll_description?: InputMaybe<StringFilter>;
  poll_name?: InputMaybe<StringFilter>;
};

export type Poll_TemplatesInsertInput = {
  cover_image?: InputMaybe<Scalars["String"]>;
  created_at?: InputMaybe<Scalars["Datetime"]>;
  poll_description?: InputMaybe<Scalars["String"]>;
  poll_name?: InputMaybe<Scalars["String"]>;
};

export type Poll_TemplatesInsertResponse = {
  __typename?: "poll_templatesInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Poll_Templates>;
};

export type Poll_TemplatesOrderBy = {
  cover_image?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  poll_description?: InputMaybe<OrderByDirection>;
  poll_name?: InputMaybe<OrderByDirection>;
};

export type Poll_TemplatesUpdateInput = {
  cover_image?: InputMaybe<Scalars["String"]>;
  created_at?: InputMaybe<Scalars["Datetime"]>;
  poll_description?: InputMaybe<Scalars["String"]>;
  poll_name?: InputMaybe<Scalars["String"]>;
};

export type Poll_TemplatesUpdateResponse = {
  __typename?: "poll_templatesUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Poll_Templates>;
};

export type Profiles = {
  __typename?: "profiles";
  avatar_url?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["Datetime"]>;
  extended_profilesCollection?: Maybe<Extended_ProfilesConnection>;
  id: Scalars["BigInt"];
  poll_option_votes_2_usersCollection?: Maybe<Poll_Option_Votes_2_UsersConnection>;
  username: Scalars["String"];
};

export type ProfilesExtended_ProfilesCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<Extended_ProfilesFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<Extended_ProfilesOrderBy>>;
};

export type ProfilesPoll_Option_Votes_2_UsersCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<Poll_Option_Votes_2_UsersFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<Poll_Option_Votes_2_UsersOrderBy>>;
};

export type ProfilesConnection = {
  __typename?: "profilesConnection";
  edges: Array<ProfilesEdge>;
  pageInfo: PageInfo;
};

export type ProfilesDeleteResponse = {
  __typename?: "profilesDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

export type ProfilesEdge = {
  __typename?: "profilesEdge";
  cursor: Scalars["String"];
  node?: Maybe<Profiles>;
};

export type ProfilesFilter = {
  avatar_url?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  username?: InputMaybe<StringFilter>;
};

export type ProfilesInsertInput = {
  avatar_url?: InputMaybe<Scalars["String"]>;
  created_at?: InputMaybe<Scalars["Datetime"]>;
  username?: InputMaybe<Scalars["String"]>;
};

export type ProfilesInsertResponse = {
  __typename?: "profilesInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

export type ProfilesOrderBy = {
  avatar_url?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  username?: InputMaybe<OrderByDirection>;
};

export type ProfilesUpdateInput = {
  avatar_url?: InputMaybe<Scalars["String"]>;
  created_at?: InputMaybe<Scalars["Datetime"]>;
  username?: InputMaybe<Scalars["String"]>;
};

export type ProfilesUpdateResponse = {
  __typename?: "profilesUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};
