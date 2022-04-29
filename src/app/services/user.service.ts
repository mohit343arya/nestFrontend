import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_USERS = gql`
query {
  users {
    _id
    firstName
    lastName
    email
    countryCode
    phone
    identityNumber
    address
    country
    line2
    city
    province
    postalCode
    linkedin
    facebook
    twitter
    createdAt
    updatedAt
  }
}
`;
;

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private apollo: Apollo) { }

  getUsers() {
    return this.apollo
      .watchQuery({
        query: GET_USERS,
      }).refetch();
  }
  createUser(user: any) {
    return this.apollo.mutate({
      mutation: USER_POST(user)
    })
  }
  removeUser(userId: any) {
    return this.apollo.mutate({
      mutation: USER_REMOVE(userId),
    })
  }
}
function USER_POST(user: any) {
  return gql`
    mutation {
      createUser(
        createUserInput: {
          firstName: "${user.firstName}"
          lastName: "${user.lastName}"
          email: "${user.email}"
          countryCode: "${user.countryCode}"
          phone: "${user.phone}"
          identityNumber: "${user.identityNumber}"
          address: "${user.address}"
          country: "${user.country}"
          line2: "${user.line2}"
          city: "${user.city}"
          province: "${user.province}"
          postalCode: "${user.postalCode}"
          linkedin: "${user.linkedin}"
          facebook: "${user.facebook}"
          twitter: "${user.twitter}"
        }
      ) {
        _id
        firstName
        lastName
        email
        countryCode
        phone
        identityNumber
        address
        country
        line2
        city
        province
        postalCode
        linkedin
        facebook
        twitter
        createdAt
        updatedAt
      }
  }

  `
}
function USER_REMOVE(id: any) {
  return gql`
    mutation {
      removeUser(_id: "${id}") {
        _id
      }
    }
  `
}
