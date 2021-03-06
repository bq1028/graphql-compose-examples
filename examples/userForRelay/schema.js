/* @flow */

import { SchemaComposer } from 'graphql-compose';
import composeWithRelay from 'graphql-compose-relay';
import { UserTC } from './models/user';

// SINGLE SCHEMA ON SERVER
// import { GQC } from 'graphql-compose';

// MULTI SCHEMA MODE IN ONE SERVER
// create new GQC from SchemaComposer
// import { SchemaComposer } from 'graphql-compose';
const GQC = new SchemaComposer();

const RootQueryTC = GQC.rootQuery();
composeWithRelay(RootQueryTC);

RootQueryTC.addFields({
  userById: UserTC.getResolver('findById'),
  userByIds: UserTC.getResolver('findByIds'),
  userOne: UserTC.getResolver('findOne'),
  userMany: UserTC.getResolver('findMany'),
  userTotal: UserTC.getResolver('count'),
  userConnection: UserTC.getResolver('connection'),
  userPagination: UserTC.getResolver('pagination'),
});

GQC.rootMutation().addFields({
  userCreate: UserTC.getResolver('createOne'),
  userUpdateById: UserTC.getResolver('updateById'),
  userUpdateOne: UserTC.getResolver('updateOne'),
  userUpdateMany: UserTC.getResolver('updateMany'),
  userRemoveById: UserTC.getResolver('removeById'),
  userRemoveOne: UserTC.getResolver('removeOne'),
  userRemoveMany: UserTC.getResolver('removeMany'),
});

const graphqlSchema = GQC.buildSchema();
export default graphqlSchema;
