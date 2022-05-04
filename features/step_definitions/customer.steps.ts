import { Actor, actorCalled } from '@serenity-js/core';
import { defineParameterType, Given, When, Then } from '@cucumber/cucumber';
import { Ensure, includes, equals } from '@serenity-js/assertions';
import { Navigate, Page, PageElement, Text, By } from '@serenity-js/web';

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

Then('{actor} sees the WhiteBox IT Solutions homepage', async (actor: Actor) => {
    const header = () =>
        PageElement.located(By.css('#headerwrap'))
            .describedAs('header')

    await actor.attemptsTo(
        Ensure.that(Page.current().title(), includes('WhiteBox')),
        Ensure.that(Text.of(header()).trim(), equals('WhiteBox\nIT Solutions')),
    )
});
