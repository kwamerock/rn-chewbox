import gql from 'graphql-tag';

export const eventFragment = gql`{
  id
  name
	isLocked
	isCancelled
	isPostponed
	avatar
	creator {
		id
		balance
		appVersion
		needToUpgrade
		timezoneOffset
		timezone
		bio
		chatId
		playerId
		username
		email
		fullName
		fullNameLower
		lunchtime
		title
		avatar
		braintreeCustomerId
		firstName
		firstNameLower
		middleName
		middleNameLower
		lastName
		lastNameLower
		dateOfBirth
		gender
		createdAt
		updatedAt
	}
	days {
		id
		name
		description
		avatar
		maxBudgetPer
		site {
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
		likeCount
		startDate
		endDate
		hasLiveStream
		hasAlcohol
		isLocked
		isCancelled
		isPostponed
		cancelledAt
		createdAt
		updatedAt
	}
	producers {
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
	shareCount
	likeCount
	likes {
		id
		donation
		donationSettled
		user {
			id
			balance
			appVersion
			needToUpgrade
			timezoneOffset
			timezone
			bio
			chatId
			playerId
			username
			email
			fullName
			fullNameLower
			lunchtime
			title
			avatar
			braintreeCustomerId
			firstName
			firstNameLower
			middleName
			middleNameLower
			lastName
			lastNameLower
			dateOfBirth
			gender
			createdAt
			updatedAt
		}
		article {
			id
			name
			nameLower
			description
			viewsCount
			likesCount
			slug
			likeCount
			isHidden
			isActive
			createdAt
			updatedAt
		}
		comment {
			id
			likeCount
			rating
			subject
			message
			createdAt
		}
		createdAt
		updatedAt
	}
	maxBudgetPer
	tags
	tickets {
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
	invitees {
		id
		balance
		appVersion
		needToUpgrade
		timezoneOffset
		timezone
		bio
		chatId
		playerId
		username
		email
		fullName
		fullNameLower
		lunchtime
		title
		avatar
		braintreeCustomerId
		firstName
		firstNameLower
		middleName
		middleNameLower
		lastName
		lastNameLower
		dateOfBirth
		gender
		createdAt
		updatedAt
	}
	carts {
		id
		user {
			id
			balance
			appVersion
			needToUpgrade
			timezoneOffset
			timezone
			bio
			chatId
			playerId
			username
			email
			fullName
			fullNameLower
			lunchtime
			title
			avatar
			braintreeCustomerId
			firstName
			firstNameLower
			middleName
			middleNameLower
			lastName
			lastNameLower
			dateOfBirth
			gender
			createdAt
			updatedAt
		}
		deliverTo {
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
		items {
			id
			name
			description
			deliverBy
			quantity
			discountType
			discountAmount
			priceEach
			subtotal
			tax
			total
			discount
			delivery
			shipping
			isReviewed
			rating
			sortOrder
			createdAt
			updatedAt
		}
		event {
			id
			name
			description
			isLocked
			isCancelled
			isPostponed
			avatar
			shareCount
			likeCount
			maxBudgetPer
			createdAt
			updatedAt
		}
		subtotal
		tipPercentage
		tip
		tax
		total
		discount
		delivery
		shipping
		isPending
		createdAt
		updatedAt
	}
	orders {
		id
		user {
			id
			balance
			appVersion
			needToUpgrade
			timezoneOffset
			timezone
			bio
			chatId
			playerId
			username
			email
			fullName
			fullNameLower
			lunchtime
			title
			avatar
			braintreeCustomerId
			firstName
			firstNameLower
			middleName
			middleNameLower
			lastName
			lastNameLower
			dateOfBirth
			gender
			createdAt
			updatedAt
		}
		driver {
			id
			balance
			appVersion
			needToUpgrade
			timezoneOffset
			timezone
			bio
			chatId
			playerId
			username
			email
			fullName
			fullNameLower
			lunchtime
			title
			avatar
			braintreeCustomerId
			firstName
			firstNameLower
			middleName
			middleNameLower
			lastName
			lastNameLower
			dateOfBirth
			gender
			createdAt
			updatedAt
		}
		pickUpFrom {
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
		deliverTo {
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
		event {
			id
			name
			description
			isLocked
			isCancelled
			isPostponed
			avatar
			shareCount
			likeCount
			maxBudgetPer
			createdAt
			updatedAt
		}
		subtotal
		tipPercentage
		tip
		tax
		total
		discount
		delivery
		shipping
		sortOrder
		useWallet
		isEvent
		isCancelledByCustomer
		isCancelledByOperator
		isArchived
		isPaid
		isDelivered
		isDelivery
		isReturned
		isReadyForDelivery
		isOnTheWay
		isBeingPrepared
		isReviewed
		deliverBy
		assignedAt
		pickUpBy
		pickedUpAt
		preparedAt
		shipDate
		deliveredAt
		cancelledAt
		notes
		studentName
		createdAt
		updatedAt
	}
	gallery {
		id
		name
		nameLower
		caption
		description
		avatar
		source
		impressions
		createdAt
		updatedAt
	}
}`
