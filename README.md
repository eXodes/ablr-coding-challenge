# Ablr Coding Challenge 2022 (React only)

[![Netlify Status](https://api.netlify.com/api/v1/badges/d0970efa-8fe7-4abe-a409-ffc6f2687e40/deploy-status)](https://app.netlify.com/sites/ablr-challenge/deploys)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/exodes/ablr-coding-challenge/CI)

## Overview

The objective is to build a simple single-page-application e-commerce site and also integrate with Ablr's "Create a checkout" API

Your e-commerce site should have the following features:

1. Customers can view the Product List page with some hardcoded products.
2. They can view a Product Detail page for each product, where they can **immediately** "Checkout with Ablr".
   It is _not_ necessary to implement the Cart page and Checkout page.
3. Customers can switch between Malaysia and Singapore stores.
4. MYR price will be converted using a hardcoded exchange rate (1 Singapore Dollar equals 3.10 Malaysian Ringgit)

API documentation: https://api.uat.ablr.com/swagger/v2/public/merchant (look for "Create a Checkout" API)
Checkout API endpoint: https://api.uat.ablr.com/api/v2/public/merchant/checkout/
Use the following API keys when testing the integration:

## Evaluation Criteria

We will look at your project and assess it for:

1. Simplicity - aim for the simplest solution that gets the job done whilst remaining
   readable, extensible and testable.
2. Test Coverage - breaking changes should break your tests.
3. Robustness - should handle and report errors.
4. Mobile friendly - should look fine on mobile devices.
   If you have any questions about these criteria please ask.

## Specifications

1. Include a README with (accurate) usage instructions.
2. You're welcome to use any UI Toolkit that you're most familiar with.

## Submission

Github is the preferred option (a public repo is fine) but we will also accept a .zip file if
necessary.

## How to run development mode

**Prerequisites**

1. Install Netlify CLI: https://www.netlify.com/docs/cli
2. Duplicate the `.env.example` file to `.env.local` and update the values.

Run the following commands to install the dependencies:

```bash
npm install --legacy-peer-deps
```

Run the following command to serve locally:

```bash
netlify dev
```

## Testing

Run the following command to run tests:

```bash
npm test
```

Run the following command to run e2e tests:

```bash
npm run e2e
```

### Test coverage

| Statements                                                                                 | Branches                                                                          | Functions                                                                           | Lines                                                                            |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/statements-92.07%25-brightgreen.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-86.72%25-yellow.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-88.63%25-yellow.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-92.07%25-brightgreen.svg?style=flat) |
