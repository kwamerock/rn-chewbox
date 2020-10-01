import { merge, namespaced } from 'overmind/config';
import { createHook } from 'overmind-react';

import { onInitialize } from './onInitialize'
import { state } from './state'
import * as effects from './effects';
import * as actions from './actions';

// common
import * as alert from '@/store/namespaces/alert';
import * as hud from '@/store/namespaces/hud';
import * as player from '@/store/namespaces/player';
import * as pushNotification from '@/store/namespaces/pushNotification';
import * as user from '@/store/namespaces/user';
import * as window from '@/store/namespaces/window';

// custom
// import * as campaigns from './namespaces/campaign'
// import * as campaignLocations from './namespaces/campaignLocation'
// import * as ads from './namespaces/ad'
// import * as adImages from './namespaces/adImage'
// import * as audiences from './namespaces/audience'
// import * as surveys from './namespaces/survey'
// import * as surveyQuestions from './namespaces/surveyQuestion'
// import * as surveyAnswers from './namespaces/surveyAnswer'
// import * as userSurveys from './namespaces/userSurvey'
// import * as adImpressions from './namespaces/adImpression'
// import * as adRedeemeds from './namespaces/adRedeemed'
// import * as articles from './namespaces/article'
// import * as articleCategories from './namespaces/articleCategory'
import * as comment from './namespaces/comment'
import * as cart from './namespaces/cart'
// import * as cartItem from './namespaces/cartItem'
import * as product from './namespaces/product'
// import * as productTasks from './namespaces/productTask'
// import * as pricings from './namespaces/pricing'
import * as order from './namespaces/order'
// import * as inventoryProducts from './namespaces/inventoryProduct'
// import * as ingredients from './namespaces/ingredient'
// import * as productionSchedules from './namespaces/productionSchedule'
// import * as prepTimes from './namespaces/prepTime'
// import * as tempTypes from './namespaces/tempType'
// import * as batchSizes from './namespaces/batchSize'
// import * as holdTimes from './namespaces/holdTime'
// import * as nutritionalFacts from './namespaces/nutritionalFact'
// import * as foodDensities from './namespaces/foodDensity'
// import * as equipment from './namespaces/equipment'
// import * as inventoryStocks from './namespaces/inventoryStock'
// import * as processData from './namespaces/processData'
// import * as inventoryVendors from './namespaces/inventoryVendor'
// import * as users from './namespaces/user'
// import * as clientMaps from './namespaces/clientMap'
// import * as clients from './namespaces/client'
// import * as schedules from './namespaces/schedule'
// import * as clockIns from './namespaces/clockIn'
// import * as scheduleBreaks from './namespaces/scheduleBreak'
// import * as userSettings from './namespaces/userSetting'
// import * as groups from './namespaces/group'
// import * as permissions from './namespaces/permission'
// import * as permissionCollections from './namespaces/permissionCollection'
// import * as permissionAccess from './namespaces/permissionAccess'
// import * as permissionAccessRules from './namespaces/permissionAccessRule'
// import * as services from './namespaces/service'
// import * as servicePasswords from './namespaces/servicePassword'
// import * as resumeTypes from './namespaces/resumeType'
// import * as loginTokens from './namespaces/loginToken'
// import * as emails from './namespaces/email'
// import * as phones from './namespaces/phone'
import * as paymentMethod from './namespaces/paymentMethod';
import * as site from './namespaces/site'
// import * as likes from './namespaces/like'
// import * as websites from './namespaces/website'
// import * as geoLocs from './namespaces/geoLoc'
// import * as media from './namespaces/media'
// import * as mediaCollections from './namespaces/mediaCollection'
// import * as mediaCollectionMembers from './namespaces/mediaCollectionMember'
// import * as images from './namespaces/image'
// import * as systemNotifications from './namespaces/systemNotification'
import * as notification from './namespaces/notification'
// import * as searchHistories from './namespaces/searchHistory'
// import * as companies from './namespaces/company'
import * as event from './namespaces/event'
// import * as eventDays from './namespaces/eventDay'
import * as transaction from './namespaces/transaction'
import * as wallet from './namespaces/wallet'
// import * as payments from './namespaces/payment'
// import * as menuItems from './namespaces/menuItem'


export const config = merge(
  {
    onInitialize,
    state,
    effects,
    actions
  },
  namespaced({
		alert,
    hud,
    user,
    player,
    pushNotification,
    window,
    // campaigns,
		// campaignLocations,
		// ads,
		// adImages,
		// audiences,
		// surveys,
		// surveyQuestions,
		// surveyAnswers,
		// userSurveys,
		// adImpressions,
		// adRedeemeds,
		// articles,
		// articleCategories,
		comment,
		cart,
		// cartItem,
		product,
		// productTasks,
		// pricings,
		order,
		// inventoryProducts,
		// ingredients,
		// productionSchedules,
		// prepTimes,
		// tempTypes,
		// batchSizes,
		// holdTimes,
		// nutritionalFacts,
		// foodDensities,
		// equipment,
		// inventoryStocks,
		// processData,
		// inventoryVendors,
		// users,
		// clientMaps,
		// clients,
		// schedules,
		// clockIns,
		// scheduleBreaks,
		// userSettings,
		// groups,
		// permissions,
		// permissionCollections,
		// permissionAccess,
		// permissionAccessRules,
		// services,
		// servicePasswords,
		// resumeTypes,
		// loginTokens,
		// emails,
		// phones,
		paymentMethod,
		site,
		// likes,
		// websites,
		// geoLocs,
		// media,
		// mediaCollections,
		// mediaCollectionMembers,
		// images,
		// systemNotifications,
		notification,
		// searchHistories,
		// companies,
		event,
		// eventDays,
		transaction,
		wallet,
		// payments,
		// menuItems,
		
  })
)

export const useOvermind = createHook();