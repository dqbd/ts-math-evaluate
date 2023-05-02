# CI/CD workflow and release management

[ci]{acronym-label="ci" acronym-form="singular+full"} and
[cd]{acronym-label="cd" acronym-form="singular+long"} are the two key
parts of the software development process that help developers deliver
high-quality software. [ci]{acronym-label="ci"
acronym-form="singular+long"} ([ci]{acronym-label="ci"
acronym-form="singular+abbrv"}) is the practice of automating the
integration of code changes into a version control repository
[@atlassianContinuousIntegrationVs], encouraging developers to merge
their changes to the main branch as often as possible.
[ci]{acronym-label="ci" acronym-form="singular+abbrv"} establishes an
automated method for building, packaging and testing the software. The
main benefit of this approach is to avoid major integration challenges
when releasing a version by continuously integrating more minor changes
during the development instead of doing all the integration on the
release day.

Whereas [cd]{acronym-label="cd" acronym-form="singular+long"}
([cd]{acronym-label="cd" acronym-form="singular+abbrv"}) is an extension
of continuous integration, where the code changes are automatically
deployed to the production environment after the build and test stage.
[cd]{acronym-label="cd" acronym-form="singular+abbrv"} aims to simplify
the deployment as much as possible, making it a routine process that can
be performed as many times as needed, even multiple times during a day
[@WhatCICD]. Note that there is a distinction between Continuous
Delivery and Continuous Deployment where the former requires human
intervention to deploy changes to production, and the latter is fully
automated without any manual steps.

Both Continuous Integration and Continuous Delivery are set up in the
implementation part of the thesis. The core of the
[ci]{acronym-label="ci"
acronym-form="singular+abbrv"}/[cd]{acronym-label="cd"
acronym-form="singular+abbrv"} setup is the Github Action platform. The
GitHub Actions platform allows developers to automate the build, test,
and deployment pipeline within an existing GitHub repository
[@UnderstandingGitHubActions]. The main components of GitHub Actions
include workflows, jobs and actions defined using YAML files saved in
the `.github/workflows`. This project uses two workflows, one for
running unit and integration tests and a second one for performing
[cd]{acronym-label="cd" acronym-form="singular+full"} to the
[npm]{acronym-label="npm" acronym-form="singular+abbrv"} registry.

The first workflow, found in `.github/workflows/main.yml`, runs both
`yarn run test` and `yarn run build` after every push to the repository
event, regardless of branch or reference. The second workflow, found in
`.github/workflows/publish.yml`, is responsible for handling releases to
the [npm]{acronym-label="npm" acronym-form="singular+abbrv"} registry
using Changesets [@ChangesetsChangesets2023]. Changesets allow
developers to keep track of the release history of a package and
automate both versioning and release note generation.

The Changesets tool works by separating versioning into two stages:
adding a changeset, describing the changes made in a commit or a branch,
and combining created changesets with a version incrementing.

Creation of a changeset is done by running `yarn changeset`, which will
ask the developer to provide the appropriate version bump type (either
MAJOR, MINOR or PATCH, following the Semver versioning) and a message
describing the changes. The changeset will be saved as a Markdown file
with a unique identifier in the `.changesets` folder. The file will be
committed to the Git repository. These changesets are preserved in the
repository until the release is ready to be published by merging the
changesets into the `main` branch.

After a push event to the `main` branch occurs, the release process,
defined as a GitHub Actions job, is launched. The release process itself
works by running `yarn changeset publish` command and works as such;
When new changesets are found in the `main` branch, Changesets will
automatically create a new pull request, which will perform all of the
key steps for releasing a package: incrementing the version, updating
the `CHANGELOG.md` file and removing the accumulated changelogs. When
the pull request is merged, Changesets will automatically publish the
new version to the [npm]{acronym-label="npm"
acronym-form="singular+abbrv"} registry, using the granular access token
provided as a secret variable for [ci]{acronym-label="ci"
acronym-form="singular+abbrv"}, and create an appropriate Git tag for
the release. The final package is published to the
[npm]{acronym-label="npm" acronym-form="singular+abbrv"} registry under
the name `ts-math-evaluate` [@Tsmathevaluate2023].
