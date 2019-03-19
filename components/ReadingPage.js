import React from "react";
import { APISelected } from "../api/Selected.js";
import { APICitation } from "../api/Citation.js";
import { APIMount } from "../api/Mount.js";
import { withTracker } from "meteor/react-meteor-data";

import ReadingList from "./ReadingList";

class ReadingPage extends React.Component {
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
    return <ReadingList />;
  }
}

const DataReadingPage = withTracker(({ id }) => {
  return {
    mount: () => {
      setTimeout(() => {
        const mounted = APIMount.find({}).fetch();
        if (mounted[0])
          APIMount.update(mounted[0]._id, {
            $set: {
              reading: true
            }
          });
      }, 200);
    },
    unmount: () => {
      const mounted = APIMount.find({}).fetch();
      APIMount.update(mounted[0]._id, {
        $set: {
          reading: false
        }
      });
    }
  };
})(ReadingPage);

export default DataReadingPage;
