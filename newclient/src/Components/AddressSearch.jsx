import {
    TextField
} from '@material-ui/core';
    
class LocationSearchBox extends React.Component {
    componentDidMount() {
        const script = document.createElement("script");

        script.src = "https://maps.googleapis.com/maps/api/js?libraries=places";
        script.async=true;
        document.body.appendChild(script);

        if (typeof google === 'undefined') {
            console.warn('Google Places was not initialized. LocationSearchBox will not function.');
            return;
        }

        const { country, onPlaceChanged } = this.props;
        const { places } = google.maps;

        let options;

        if (country) {
            options = {
            componentRestrictions: { country }
            };
        }

        const input = this.locationSearch;

        input.setAttribute('placeholder', '');

        if (!input._autocomplete) {
            input._autocomplete = new places.Autocomplete(input, options);

            input._autocomplete.addListener('place_changed', () => {
            onPlaceChanged && onPlaceChanged(input._autocomplete.getPlace());
            }.bind(input._autocomplete));
        }
    }

    render() {
        return (
            <span>
                <TextField ref={ref => (this.locationSearch = ref.input)} hintText="Search nearby" />
            </span>
        );
    }
}
    