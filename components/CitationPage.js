import React from "react";
import { APISelected } from "../api/Selected.js";
import { APICitation } from "../api/Citation.js";
import { APIMount } from "../api/Mount.js";
import { withTracker } from "meteor/react-meteor-data";

import CitationView from "./CitationView";

class CitationPage extends React.Component {
  componentDidMount() {
    window.addEventListener("beforeunload", event => {
      this.props.unmount();
    });
    window.addEventListener("pagehide", event => {
      this.props.unmount();
    });
    this.props.mount();
  }
  componentWillUnmount() {
    window.removeEventListener("beforeunload");
    window.removeEventListener("pagehide");
    this.props.unmount();
  }

  render() {
    return <CitationView />;
  }
}

const DataCitationPage = withTracker(({ id }) => {
  return {
    mount: () => {
      setTimeout(() => {
        const mounted = APIMount.find({}).fetch();
        if (mounted[0])
          APIMount.update(mounted[0]._id, {
            $set: {
              citation: true
            }
          });
      }, 200);
    },
    unmount: () => {
      const mounted = APIMount.find({}).fetch();
      APIMount.update(mounted[0]._id, {
        $set: {
          citation: false
        }
      });
    }
  };
})(CitationPage);

export default DataCitationPage;
