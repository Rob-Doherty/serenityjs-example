import { Actor, actorCalled } from '@serenity-js/core';
import { defineParameterType, Given, When, Then } from '@cucumber/cucumber';
import { Ensure, includes, equals } from '@serenity-js/assertions';
import { Navigate, Page, PageElement, Text, By, Click } from '@serenity-js/web';

defineParameterType({
    regexp: /[A-Z][a-z]+/,
    transformer(name: string) {
        return actorCalled(name);
    },
    name: 'actor',
});

// When('Customer opens WhiteBox IT Solutions homepage', async () => {
//     await actorCalled('Rob').attemptsTo(
//         Navigate.to('https://www.whiteboxitsolutions.com'),
//     )
// });

When('{actor} opens the WhiteBox IT Solutions homepage', async (actor: Actor) => {
    await actor.attemptsTo(
        Navigate.to('https://www.whiteboxitsolutions.com'),
    )
});

When('{actor} clicks the GitHub link', async (actor: Actor) => {
    const githubLink = () =>
        PageElement.located(By.xpath('//h3/*[text()="Github"]'))
            .describedAs('GitHub link')

    await actor.attemptsTo(
        Click.on(githubLink()),
    )
});

Then('{actor} sees the WhiteBox IT Solutions homepage', async (actor: Actor) => {
    const header = () =>
        PageElement.located(By.css('#headerwrap'))
            .describedAs('header')

    await actor.attemptsTo(
        Ensure.that(Page.current().title(), includes('WhiteBox')),
        Ensure.that(Text.of(header()).trim(), equals('WhiteBox\nIT Solutions')),
    )
});

Then('{actor} sees the GitHub page', async (actor: Actor) => {
    await actor.attemptsTo(
        Ensure.that(Page.current().title(), includes('GitHub')),
        Ensure.that(Page.current().url().pathname, includes('github.com/Rob-Doherty')),
    )
});
