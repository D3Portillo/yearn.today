<p align="center">
	<h1 align="center">YieldEarn Today</h1>
</p>

<p align="center">
	<img src="https://raw.githubusercontent.com/D3Portillo/yearn.today/master/public/seo.png"/>
</p>

<p align="center">
	💰 Invest on stable vaults to earn constant rewards.
</p>

---

## Stack

Frontend is done with Nextjs. To consume vaults [@yfi/sdk](https://yearn.github.io/yearn-sdk/) is being used. Stable (USDC in vault) vaults are filtered and staled from `pages/api`. Connectivity is done with [@rainbowkit](https://rainbowkit.com/) : )

This is a product under develop. Feel free to open any issue or provide comments on [yearn.today/issues/new ↗](https://github.com/D3Portillo/yearn.today/issues/new)

## Develop

```
npm install && npm run dev
```

## Yearn Vault Fetching (API/SDK)

- https://yearn.github.io/yearn-sdk
- https://api.yearn.finance/v1/chains/1/vaults/all
- https://medium.com/iearn/ydaemon-one-api-to-unify-all-yearn-data-4fc74dc9a33b

## Resources and references

- https://yearn.finance/vaults
- https://docs.yearn.finance/getting-started/guides/how-to-understand-yvault-roi
- https://docs.yearn.finance/getting-started/products/yvaults/vault-tokens#v2-yvault-tokens
