import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'

export const mapClient = axios.create({
  baseURL: `https://dapi.kakao.com/v2/local/search`,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_MAP_REST_API_KEY}`,
  },
})

mapClient.interceptors.response.use((response) => ({
  ...response,
  data: camelcaseKeys(response.data, { deep: true }),
}))
