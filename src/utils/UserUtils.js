import { CLIENT_ID } from '../constants/Config';
import { SC_API_URL } from '../constants/Api';

export function constructUserUrl(userId) {
  return `${SC_API_URL}/users/${userId}?client_id=${CLIENT_ID}`;
}

export function constructUserTracksUrl(userId) {
  return `${SC_API_URL}/users/${userId}/tracks?client_id=${CLIENT_ID}`;
}

export function constructUserFollowingsUrl(userId) {
  return `${SC_API_URL}/users/${userId}/followings?client_id=${CLIENT_ID}`;
}

export function constructUserProfilesUrl(userId) {
  return `${SC_API_URL}/users/${userId}/web-profiles?client_id=${CLIENT_ID}`;
}

export function getUserLocation(user) {
  if (user.city && user.country) {
    return `${user.city}, ${user.country}`;
  } else if (user.city) {
    return user.city;
  } else if (user.country) {
    return user.country;
  }

  return 'Earth';
}
