# Rillion interactive demo

A public, login-free simulation of a Rillion accounts-payable workflow. It uses fictional Northstar Manufacturing data and is not connected to Demo51 or any production service. The click-through includes To Verify, a Demo51-style Invoice Log with the real field order and labeled green/yellow/red evidence, role-grouped approvals, Documents and Contracts register/detail flows, four Payments states, and eleven Rillion Analytics boards grouped in platform order. The upper-right Approval role selector is the primary path to AP review, Department manager, and Finance controller approvals; a prominent Guided tour control is visible on arrival; and the sidebar uses the official lime Rillion logo asset.

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
