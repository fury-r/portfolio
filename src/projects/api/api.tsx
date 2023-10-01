import axios from 'axios'

const url = 'https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true'

export const fetchData = async (state) => {
    let changeableUrl = url
    const main = await axios.get(changeableUrl).then(res => res.data)



    try {

        if (state) {
            const select = await axios.get(changeableUrl).then(res => res.data).then((res) => res.regionData).then((res) => {
                const data = res.filter((d) => {
                    if (d.region == state) {
                        return d
                    }

                })
                return data

            })
     
            const data = select[0]
            return {
                activeCases: data.activeCases,
                recovered: data.recovered,
                deceased: data.deceased,
                lastUpdatedAtApify: main.lastUpdatedAtApify,
            }
        }
        else {
            return {
                activeCases: main.activeCases,
                recovered: main.recovered,
                deceased: main.deaths,
                lastUpdatedAtApify: main.lastUpdatedAtApify,
            }
        }

    } catch (e) {
        console.log(e)
    }
}

export const fetchDailyData = async () => {
    try {
        const data = [await axios.get(`${url}`).then((res) => {
            console.log(res.data)
            return res.data
        })]
        console.log(data)
        const modifiedData = data.map((dailyData) => (

            {
                confirmed: dailyData.activeCases,
                deaths: dailyData.deaths,
                date: dailyData.lastUpdatedAtApify
            }));
        console.log(modifiedData, "data")
        return modifiedData;
    } catch (error) {
        console.log(error)
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`)

        return countries.map((country) => country.name)
    } catch (error) {
        console.log(error)
    }
}