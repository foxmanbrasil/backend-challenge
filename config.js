module.exports = {
    secret: 'ineedtobuynewcar',
    expiresIn: '12h',
    Google: {
        provider: 'google',
        httpAdapter: 'https', // Default
        apiKey: 'AIzaSyDyBAVO9U92gWkT8Jb_unZBahycwpwjyIw', // mine is not working any more i am using AMAZON , not google cloud // You must enable Billing on the Google Cloud Project 
        formatter: null // 'gpx', 'string'.
    }
};