import {isNil, chunk, dropRight} from 'lodash'

function join(...params) {
    return params.filter(i => !isNil(i)).join(' ')
}

export function getAddressMultiline(site) {
    if (!site){
        return ''
    }
    if (site.id) {
        const _1stLine = join(site.address, site.address2)
        const _2ndLine = join(site.city, site.state, site.postalCode)
        return `${_1stLine}\n${_2ndLine}`;
    } else if(site.details && site.details.place_id){
        // In case of google place id
        const arr = dropRight(site.details.formatted_address.split(', '))   // Just drop the country
        const chunks = chunk(arr, Math.ceil(arr.length / 2))
        return chunks.filter(chunk => chunk.length).map(chunk => join(...chunk)).join('\n')
    } else if(site.details && site.details.coords) {
        // Name expreses all for this
        return ''
    }
    return site.address || ''
}

export function getAddress(site){
    if (!site){
        return ''
    }
    if (site.id){
        return join(site.address, site.address2, site.city, site.state, site.postalCode)
    } else if (site.details && site.details.place_id) {     // From google place
        return addressNoCountry(site.details.formatted_address)
    } else if (site.details && site.details.coords) {       // From user's current location
        const coords = site.details.coords
        return `Use current location ${coords.latitude.toFixed(3)}, ${coords.longitude.toFixed(3)}`
    }
    return site.address || ''
}

export function createSiteUpdateOneInput(site){
    if (!site){
        return {}
    }
    if (site.id) {
        return { connect: {id : site.id}}
    } else if (site.details && site.details.place_id) {
        return {
            create :{
                googlePlacesId: site.details.place_id
            }
        }
    } else if(site.details && site.details.coords){
        const {latitude, longitude} = site.details.coords
        return {
            create: {
                gps: {
                    create: {lat: latitude, lon:longitude}
                }
            }
        }
    }
    return {}
}

export function cartItemDeliverTo(site) {
    if (!site){
        return {}
    }
    if (site.id) {
        return {deliverTo: {id: site.id}}
    } else if (site.details && site.details.place_id) {
        return {googlePlacesId: site.details.place_id}
    } else if (site.details && site.details.coords) {
        const {latitude, longitude} = site.details.coords
        return {gps: {lat: latitude, longitude}}
    }
}

export function addressNoCountry(fullAdress){
    return dropRight(fullAdress.split(', ')).join(', ')
}

export default { getAddress, getAddressMultiline, createSiteUpdateOneInput, cartItemDeliverTo };
