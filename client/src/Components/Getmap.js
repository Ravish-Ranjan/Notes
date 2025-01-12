function Getmap({ longitude, latitude }) {
    return (
        <iframe
            src={`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d723.4297140415626!2d${longitude}!3d${latitude}!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1731503345046!5m2!1sen!2sin`}
            width="600"
            height="450"
            style={{ border: "0" }}
            allowfullscreen=""
            loading="lazy"
            id="gmap"
            title="Your location"
            referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
    );
}
export default Getmap;
