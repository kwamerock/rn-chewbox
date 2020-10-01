import gql from 'graphql-tag';

export const siteFragment = gql`{
  id
  name
  address2
  address
  city
  state
  country
  rating
  tags
  postalCode
  avatar
  gps{
    lat
    lon
  }
  images {
      id
      url
    }
  groups {
      id
      name
  }
  sortOrder
  likes{
    id
    user{
      id
    }
  }
  products {
    id
    name
    description
    isAddOn
    isFood
    rating
    isAlcohol
    categories
    pricing {
      id
      retailPrice
      type
    }
    tasks {
      id
      sortOrder
      name
      description
      type
      inventoryProduct {
        id
        ingredient {
          id
          name
        }
        minimumOrderSize
        minimumOrderUnit
      }
      size
      unit
    }
    images {
      id
      url
    }
  }
}`
