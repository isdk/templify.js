import { Help } from '@oclif/core';
import { addWithBannarHelpAbilityTo } from './help-with-banner-ability.js';

export default class HelpWithBannar extends Help {
}

addWithBannarHelpAbilityTo(HelpWithBannar, {bannerPrefix: 'Templify'})