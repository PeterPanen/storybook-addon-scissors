import "@storybook/addon-actions/register";
import registerScissors from "../src/register";
import devicesJSON from "./devices.json";

const devices = devicesJSON.extensions.map(({ device }) => ({
  uid: device.title,
  title: device.title,
  width: device.screen.vertical.width,
  height: device.screen.vertical.height
}));

registerScissors(devices);
