import { addons } from '@storybook/manager-api';

// Hide the addon panel by default
addons.register('hide-addon-panel', (api) => {
  api.togglePanel(false);
});
