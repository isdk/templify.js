// import { type Command, Help } from '@oclif/core';
import { artisticText } from '@isdk/artistic-text'
import { createAbilityInjector } from 'custom-ability'

export class HelpWithBannarAbility {
  static BannerPrefix = ''
  static showBanner(s?: string) {
    if (s && this.BannerPrefix) {
      s = this.BannerPrefix + ' ' + s
    } else {
      s = this.BannerPrefix
    }
    console.log(artisticText(s, {color: 'blue', })); // font: 'ANSI Shadow'
  }

  async $showHelp(this:{super?: Function, self?: any, [k: string]: any}, args: string[]) {
    // console.log(uText('AI Agent', 'green'));
    const showHelp = this.super
    const that = this.self || this
    const ctor = that.constructor
    const i = args.indexOf('--no-banner')
    if (i === -1) {
      ctor.showBanner()
    } else {
      args.splice(i, 1)
    }

    if(showHelp) showHelp(args);
    // console.dir('This will be displayed in multi-command CLIs', args);
  }

  // async showCommandHelp(command: Command.Loadable) {
  //   // showBanner();
  //   super.showCommandHelp(command);
  //   // console.log('This will be displayed in single-command CLIs');
  // }
}

function onInjectionSuccess(Class: typeof HelpWithBannarAbility, options?: { bannerPrefix?: string }) {
  if (options?.bannerPrefix) {
    Class.BannerPrefix = options.bannerPrefix
  }
}

export const addWithBannarHelpAbilityTo = createAbilityInjector(HelpWithBannarAbility, '@showBanner', {afterInjection: onInjectionSuccess as any})
