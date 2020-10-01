import gql from 'graphql-tag';

export const campaignFragment = gql`{
  id
  name
	impressions
	surveys
	ads {
		id
		name
		subTitle
		images {
			id
			iPhone
			android
		}
		sponsorLine2
		sponsorLogo
		backgroundImage
		title
		description
		description2
		image
		brandLogo
		status
		footerDescription
		validThroughDate
		recipeUrl
		textColor
		buttonColor
		createdAt
		updatedAt
	}
	audiences {
		id
		name
		audienceFor
		sites {
			id
			name
			nameLower
			description
			slug
			rating
			address
			address2
			city
			state
			postalCode
			country
			likeCount
			typeName
			geoFenceRadius
			isActive
			servesAlcohol
			isCommercial
			isFranchise
			taxRate
			avatar
			visits
			uniqueVisits
			inDevelopment
			googlePlacesId
			defaultLunchtime
			sortOrder
			createdAt
			updatedAt
		}
		ages
		gender
	}
	exceededParticipantTarget
	redemptionCount
	startDate
	endDate
	setupSurvey
	venueRestrictions {
		id
		name
		nameLower
		description
		slug
		rating
		address
		address2
		city
		state
		postalCode
		country
		likeCount
		typeName
		geoFenceRadius
		isActive
		servesAlcohol
		isCommercial
		isFranchise
		taxRate
		avatar
		visits
		uniqueVisits
		inDevelopment
		googlePlacesId
		defaultLunchtime
		sortOrder
		createdAt
		updatedAt
	}
	brandRestrictions {
		id
		name
		nameLower
		slug
		entityType
		phones {
			id
			number
			verificationCode
			verified
			type
			isDefault
		}
		startDate
		domicileCountry
		domicileState
		domicileDate
		avatar
		isVerified
		isFranchise
		isBrand
		isPublicallyTraded
		tickerSymbol
	}
	products {
		id
		name
		nameLower
		description
		slug
		symbol
		posItemId
		likeCount
		rating
		sortOrder
		showOnHHMenu
		isHidden
		isActive
		isAlcohol
		isFood
		isAddOn
		isTaxable
		isRefundable
		isEticket
		onSale
		isFree
		createdAt
		updatedAt
	}
	discountType
	discountAmount
	maxItemsPer
	cost
	PPA
	pnMessage
	feedbackCount
	rating
	status
	isSupplier
	isActive
	survey {
		id
		questions {
			id
			question
			sortOrder
		}
		status
	}
}`