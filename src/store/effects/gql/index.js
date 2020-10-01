import { graphql } from 'overmind-graphql';

import * as campaignMutations from './campaign/mutations'
import * as campaignQueries from './campaign/queries'
import * as campaignSubscriptions from './campaign/subscriptions'

import * as campaignLocationMutations from './campaignLocation/mutations'
import * as campaignLocationQueries from './campaignLocation/queries'
import * as campaignLocationSubscriptions from './campaignLocation/subscriptions'

import * as adMutations from './ad/mutations'
import * as adQueries from './ad/queries'
import * as adSubscriptions from './ad/subscriptions'

import * as adImageMutations from './adImage/mutations'
import * as adImageQueries from './adImage/queries'
import * as adImageSubscriptions from './adImage/subscriptions'

import * as audienceMutations from './audience/mutations'
import * as audienceQueries from './audience/queries'
import * as audienceSubscriptions from './audience/subscriptions'

import * as surveyQuestionMutations from './surveyQuestion/mutations'
import * as surveyQuestionQueries from './surveyQuestion/queries'
import * as surveyQuestionSubscriptions from './surveyQuestion/subscriptions'

import * as surveyAnswerMutations from './surveyAnswer/mutations'
import * as surveyAnswerQueries from './surveyAnswer/queries'
import * as surveyAnswerSubscriptions from './surveyAnswer/subscriptions'

import * as userSurveyMutations from './userSurvey/mutations'
import * as userSurveyQueries from './userSurvey/queries'
import * as userSurveySubscriptions from './userSurvey/subscriptions'

import * as adImpressionMutations from './adImpression/mutations'
import * as adImpressionQueries from './adImpression/queries'
import * as adImpressionSubscriptions from './adImpression/subscriptions'

import * as adRedeemedMutations from './adRedeemed/mutations'
import * as adRedeemedQueries from './adRedeemed/queries'
import * as adRedeemedSubscriptions from './adRedeemed/subscriptions'

import * as articleCategoryMutations from './articleCategory/mutations'
import * as articleCategoryQueries from './articleCategory/queries'
import * as articleCategorySubscriptions from './articleCategory/subscriptions'

import * as commentMutations from './comment/mutations'
import * as commentQueries from './comment/queries'
import * as commentSubscriptions from './comment/subscriptions'

import * as cartMutations from './cart/mutations'
import * as cartQueries from './cart/queries'
import * as cartSubscriptions from './cart/subscriptions'

import * as cartItemMutations from './cartItem/mutations'
import * as cartItemQueries from './cartItem/queries'
import * as cartItemSubscriptions from './cartItem/subscriptions'

import * as productMutations from './product/mutations'
import * as productQueries from './product/queries'
import * as productSubscriptions from './product/subscriptions'

import * as pricingMutations from './pricing/mutations'
import * as pricingQueries from './pricing/queries'
import * as pricingSubscriptions from './pricing/subscriptions'

import * as surveyMutations from './survey/mutations'
import * as surveyQueries from './survey/queries'
import * as surveySubscriptions from './survey/subscriptions'

import * as articleMutations from './article/mutations'
import * as articleQueries from './article/queries'
import * as articleSubscriptions from './article/subscriptions'

import * as orderMutations from './order/mutations'
import * as orderQueries from './order/queries'
import * as orderSubscriptions from './order/subscriptions'

import * as inventoryProductMutations from './inventoryProduct/mutations'
import * as inventoryProductQueries from './inventoryProduct/queries'
import * as inventoryProductSubscriptions from './inventoryProduct/subscriptions'

import * as ingredientMutations from './ingredient/mutations'
import * as ingredientQueries from './ingredient/queries'
import * as ingredientSubscriptions from './ingredient/subscriptions'

import * as productionScheduleMutations from './productionSchedule/mutations'
import * as productionScheduleQueries from './productionSchedule/queries'
import * as productionScheduleSubscriptions from './productionSchedule/subscriptions'

import * as prepTimeMutations from './prepTime/mutations'
import * as prepTimeQueries from './prepTime/queries'
import * as prepTimeSubscriptions from './prepTime/subscriptions'

import * as batchSizeMutations from './batchSize/mutations'
import * as batchSizeQueries from './batchSize/queries'
import * as batchSizeSubscriptions from './batchSize/subscriptions'

import * as holdTimeMutations from './holdTime/mutations'
import * as holdTimeQueries from './holdTime/queries'
import * as holdTimeSubscriptions from './holdTime/subscriptions'

import * as productTaskMutations from './productTask/mutations'
import * as productTaskQueries from './productTask/queries'
import * as productTaskSubscriptions from './productTask/subscriptions'

import * as tempTypeMutations from './tempType/mutations'
import * as tempTypeQueries from './tempType/queries'
import * as tempTypeSubscriptions from './tempType/subscriptions'

import * as nutritionalFactMutations from './nutritionalFact/mutations'
import * as nutritionalFactQueries from './nutritionalFact/queries'
import * as nutritionalFactSubscriptions from './nutritionalFact/subscriptions'

import * as foodDensityMutations from './foodDensity/mutations'
import * as foodDensityQueries from './foodDensity/queries'
import * as foodDensitySubscriptions from './foodDensity/subscriptions'

import * as equipmentMutations from './equipment/mutations'
import * as equipmentQueries from './equipment/queries'
import * as equipmentSubscriptions from './equipment/subscriptions'

import * as inventoryStockMutations from './inventoryStock/mutations'
import * as inventoryStockQueries from './inventoryStock/queries'
import * as inventoryStockSubscriptions from './inventoryStock/subscriptions'

import * as processDataMutations from './processData/mutations'
import * as processDataQueries from './processData/queries'
import * as processDataSubscriptions from './processData/subscriptions'

import * as inventoryVendorMutations from './inventoryVendor/mutations'
import * as inventoryVendorQueries from './inventoryVendor/queries'
import * as inventoryVendorSubscriptions from './inventoryVendor/subscriptions'

import * as userMutations from './user/mutations'
import * as userQueries from './user/queries'
import * as userSubscriptions from './user/subscriptions'

import * as clientMutations from './client/mutations'
import * as clientQueries from './client/queries'
import * as clientSubscriptions from './client/subscriptions'

import * as scheduleMutations from './schedule/mutations'
import * as scheduleQueries from './schedule/queries'
import * as scheduleSubscriptions from './schedule/subscriptions'

import * as clockInMutations from './clockIn/mutations'
import * as clockInQueries from './clockIn/queries'
import * as clockInSubscriptions from './clockIn/subscriptions'

import * as scheduleBreakMutations from './scheduleBreak/mutations'
import * as scheduleBreakQueries from './scheduleBreak/queries'
import * as scheduleBreakSubscriptions from './scheduleBreak/subscriptions'

import * as userSettingMutations from './userSetting/mutations'
import * as userSettingQueries from './userSetting/queries'
import * as userSettingSubscriptions from './userSetting/subscriptions'

import * as groupMutations from './group/mutations'
import * as groupQueries from './group/queries'
import * as groupSubscriptions from './group/subscriptions'

import * as permissionMutations from './permission/mutations'
import * as permissionQueries from './permission/queries'
import * as permissionSubscriptions from './permission/subscriptions'

import * as permissionCollectionMutations from './permissionCollection/mutations'
import * as permissionCollectionQueries from './permissionCollection/queries'
import * as permissionCollectionSubscriptions from './permissionCollection/subscriptions'

import * as permissionAccessRuleMutations from './permissionAccessRule/mutations'
import * as permissionAccessRuleQueries from './permissionAccessRule/queries'
import * as permissionAccessRuleSubscriptions from './permissionAccessRule/subscriptions'

import * as serviceMutations from './service/mutations'
import * as serviceQueries from './service/queries'
import * as serviceSubscriptions from './service/subscriptions'

import * as servicePasswordMutations from './servicePassword/mutations'
import * as servicePasswordQueries from './servicePassword/queries'
import * as servicePasswordSubscriptions from './servicePassword/subscriptions'

import * as loginTokenMutations from './loginToken/mutations'
import * as loginTokenQueries from './loginToken/queries'
import * as loginTokenSubscriptions from './loginToken/subscriptions'

import * as emailMutations from './email/mutations'
import * as emailQueries from './email/queries'
import * as emailSubscriptions from './email/subscriptions'

import * as phoneMutations from './phone/mutations'
import * as phoneQueries from './phone/queries'
import * as phoneSubscriptions from './phone/subscriptions'

import * as clientMapMutations from './clientMap/mutations'
import * as clientMapQueries from './clientMap/queries'
import * as clientMapSubscriptions from './clientMap/subscriptions'

import * as permissionAccessMutations from './permissionAccess/mutations'
import * as permissionAccessQueries from './permissionAccess/queries'
import * as permissionAccessSubscriptions from './permissionAccess/subscriptions'

import * as resumeTypeMutations from './resumeType/mutations'
import * as resumeTypeQueries from './resumeType/queries'
import * as resumeTypeSubscriptions from './resumeType/subscriptions'

import * as paymentMethodMutations from './paymentMethod/mutations'
import * as paymentMethodQueries from './paymentMethod/queries'
import * as paymentMethodSubscriptions from './paymentMethod/subscriptions'

import * as siteMutations from './site/mutations'
import * as siteQueries from './site/queries'
import * as siteSubscriptions from './site/subscriptions'

import * as websiteMutations from './website/mutations'
import * as websiteQueries from './website/queries'
import * as websiteSubscriptions from './website/subscriptions'

import * as geoLocMutations from './geoLoc/mutations'
import * as geoLocQueries from './geoLoc/queries'
import * as geoLocSubscriptions from './geoLoc/subscriptions'

import * as mediaMutations from './media/mutations'
import * as mediaQueries from './media/queries'
import * as mediaSubscriptions from './media/subscriptions'

import * as mediaCollectionMutations from './mediaCollection/mutations'
import * as mediaCollectionQueries from './mediaCollection/queries'
import * as mediaCollectionSubscriptions from './mediaCollection/subscriptions'

import * as mediaCollectionMemberMutations from './mediaCollectionMember/mutations'
import * as mediaCollectionMemberQueries from './mediaCollectionMember/queries'
import * as mediaCollectionMemberSubscriptions from './mediaCollectionMember/subscriptions'

import * as systemNotificationMutations from './systemNotification/mutations'
import * as systemNotificationQueries from './systemNotification/queries'
import * as systemNotificationSubscriptions from './systemNotification/subscriptions'

import * as notificationMutations from './notification/mutations'
import * as notificationQueries from './notification/queries'
import * as notificationSubscriptions from './notification/subscriptions'

import * as searchHistoryMutations from './searchHistory/mutations'
import * as searchHistoryQueries from './searchHistory/queries'
import * as searchHistorySubscriptions from './searchHistory/subscriptions'

import * as companyMutations from './company/mutations'
import * as companyQueries from './company/queries'
import * as companySubscriptions from './company/subscriptions'

import * as eventMutations from './event/mutations'
import * as eventQueries from './event/queries'
import * as eventSubscriptions from './event/subscriptions'

import * as transactionMutations from './transaction/mutations'
import * as transactionQueries from './transaction/queries'
import * as transactionSubscriptions from './transaction/subscriptions'

import * as walletMutations from './wallet/mutations'
import * as walletQueries from './wallet/queries'
import * as walletSubscriptions from './wallet/subscriptions'

import * as paymentMutations from './payment/mutations'
import * as paymentQueries from './payment/queries'
import * as paymentSubscriptions from './payment/subscriptions'

import * as menuItemMutations from './menuItem/mutations'
import * as menuItemQueries from './menuItem/queries'
import * as menuItemSubscriptions from './menuItem/subscriptions'

export default graphql({
  subscriptions: {
    // ...campaignSubscriptions,
    // ...campaignLocationSubscriptions,
    // ...adSubscriptions,
    // ...adImageSubscriptions,
    // ...audienceSubscriptions,
    // ...surveyQuestionSubscriptions,
    // ...surveyAnswerSubscriptions,
    // ...userSurveySubscriptions,
    // ...adImpressionSubscriptions,
    // ...adRedeemedSubscriptions,
    // ...articleCategorySubscriptions,
    // ...commentSubscriptions,
    // ...cartSubscriptions,
    // ...cartItemSubscriptions,
    // ...productSubscriptions,
    // ...pricingSubscriptions,
    // ...surveySubscriptions,
    // ...articleSubscriptions,
    // ...orderSubscriptions,
    // ...inventoryProductSubscriptions,
    // ...ingredientSubscriptions,
    // ...productionScheduleSubscriptions,
    // ...prepTimeSubscriptions,
    // ...batchSizeSubscriptions,
    // ...holdTimeSubscriptions,
    // ...productTaskSubscriptions,
    // ...tempTypeSubscriptions,
    // ...nutritionalFactSubscriptions,
    // ...foodDensitySubscriptions,
    // ...equipmentSubscriptions,
    // ...inventoryStockSubscriptions,
    // ...processDataSubscriptions,
    // ...inventoryVendorSubscriptions,
    ...userSubscriptions,
    // ...clientSubscriptions,
    // ...scheduleSubscriptions,
    // ...clockInSubscriptions,
    // ...scheduleBreakSubscriptions,
    // ...userSettingSubscriptions,
    // ...groupSubscriptions,
    // ...permissionSubscriptions,
    // ...permissionCollectionSubscriptions,
    // ...permissionAccessRuleSubscriptions,
    // ...serviceSubscriptions,
    // ...servicePasswordSubscriptions,
    // ...loginTokenSubscriptions,
    // ...emailSubscriptions,
    // ...phoneSubscriptions,
    // ...clientMapSubscriptions,
    // ...permissionAccessSubscriptions,
    // ...resumeTypeSubscriptions,
    // ...paymentMethodSubscriptions,
    // ...siteSubscriptions,
    // ...websiteSubscriptions,
    // ...geoLocSubscriptions,
    // ...mediaSubscriptions,
    // ...mediaCollectionSubscriptions,
    // ...mediaCollectionMemberSubscriptions,
    // ...systemNotificationSubscriptions,
    // ...notificationSubscriptions,
    // ...searchHistorySubscriptions,
    // ...companySubscriptions,
    // ...eventSubscriptions,
    // ...transactionSubscriptions,
    // ...walletSubscriptions,
    // ...paymentSubscriptions,
    // ...menuItemSubscriptions
  },
  queries: {
    ...campaignQueries,
    ...campaignLocationQueries,
    ...adQueries,
    ...adImageQueries,
    ...audienceQueries,
    ...surveyQuestionQueries,
    ...surveyAnswerQueries,
    ...userSurveyQueries,
    ...adImpressionQueries,
    ...adRedeemedQueries,
    ...articleCategoryQueries,
    ...commentQueries,
    ...cartQueries,
    ...cartItemQueries,
    ...productQueries,
    ...pricingQueries,
    ...surveyQueries,
    ...articleQueries,
    ...orderQueries,
    ...inventoryProductQueries,
    ...ingredientQueries,
    ...productionScheduleQueries,
    ...prepTimeQueries,
    ...batchSizeQueries,
    ...holdTimeQueries,
    ...productTaskQueries,
    ...tempTypeQueries,
    ...nutritionalFactQueries,
    ...foodDensityQueries,
    ...equipmentQueries,
    ...inventoryStockQueries,
    ...processDataQueries,
    ...inventoryVendorQueries,
    ...userQueries,
    ...clientQueries,
    ...scheduleQueries,
    ...clockInQueries,
    ...scheduleBreakQueries,
    ...userSettingQueries,
    ...groupQueries,
    ...permissionQueries,
    ...permissionCollectionQueries,
    ...permissionAccessRuleQueries,
    ...serviceQueries,
    ...servicePasswordQueries,
    ...loginTokenQueries,
    ...emailQueries,
    ...phoneQueries,
    ...clientMapQueries,
    ...permissionAccessQueries,
    ...resumeTypeQueries,
    ...paymentMethodQueries,
    ...siteQueries,
    ...websiteQueries,
    ...geoLocQueries,
    ...mediaQueries,
    ...mediaCollectionQueries,
    ...mediaCollectionMemberQueries,
    ...systemNotificationQueries,
    ...notificationQueries,
    ...searchHistoryQueries,
    ...companyQueries,
    ...eventQueries,
    ...transactionQueries,
    ...walletQueries,
    ...paymentQueries,
    ...menuItemQueries
  },
  mutations: {
    ...campaignMutations,
    ...campaignLocationMutations,
    ...adMutations,
    ...adImageMutations,
    ...audienceMutations,
    ...surveyQuestionMutations,
    ...surveyAnswerMutations,
    ...userSurveyMutations,
    ...adImpressionMutations,
    ...adRedeemedMutations,
    ...articleCategoryMutations,
    ...commentMutations,
    ...cartMutations,
    ...cartItemMutations,
    ...productMutations,
    ...pricingMutations,
    ...surveyMutations,
    ...articleMutations,
    ...orderMutations,
    ...inventoryProductMutations,
    ...ingredientMutations,
    ...productionScheduleMutations,
    ...prepTimeMutations,
    ...batchSizeMutations,
    ...holdTimeMutations,
    ...productTaskMutations,
    ...tempTypeMutations,
    ...nutritionalFactMutations,
    ...foodDensityMutations,
    ...equipmentMutations,
    ...inventoryStockMutations,
    ...processDataMutations,
    ...inventoryVendorMutations,
    ...userMutations,
    ...clientMutations,
    ...scheduleMutations,
    ...clockInMutations,
    ...scheduleBreakMutations,
    ...userSettingMutations,
    ...groupMutations,
    ...permissionMutations,
    ...permissionCollectionMutations,
    ...permissionAccessRuleMutations,
    ...serviceMutations,
    ...servicePasswordMutations,
    ...loginTokenMutations,
    ...emailMutations,
    ...phoneMutations,
    ...clientMapMutations,
    ...permissionAccessMutations,
    ...resumeTypeMutations,
    ...paymentMethodMutations,
    ...siteMutations,
    ...websiteMutations,
    ...geoLocMutations,
    ...mediaMutations,
    ...mediaCollectionMutations,
    ...mediaCollectionMemberMutations,
    ...systemNotificationMutations,
    ...notificationMutations,
    ...searchHistoryMutations,
    ...companyMutations,
    ...eventMutations,
    ...transactionMutations,
    ...walletMutations,
    ...paymentMutations,
    ...menuItemMutations
  }
})
