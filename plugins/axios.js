export default function({ $axios, redirect }) {
  $axios.onRequest(config => {
    // config.timeout = 3000
    config.baseURL = process.env.ROUTEPATH
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect("/400")
    }
  })
}
