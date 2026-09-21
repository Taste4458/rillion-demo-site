# Rillion interactive demo

A public, login-free simulation of a Rillion accounts-payable workflow. It uses fictional Northstar Manufacturing data and is not connected to Demo51 or any production service. The click-through includes To Verify, Invoice Log, role-grouped approvals, a Documents inbox and detail flow, four Payments states, and five representative Rillion Analytics views. The upper-right Approval role selector is the primary path to AP review, Department manager, and Finance controller approvals; the sidebar uses the official lime Rillion logo asset.

Explore the live demo at <https://taste4458.github.io/rillion-demo-site/>.

## Run locally

```sh
python3 -m http.server 4173
```

Open <http://127.0.0.1:4173/>.

## Check the simulation contract

```sh
node check.mjs
```
