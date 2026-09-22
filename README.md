# Rillion interactive demo

A public, login-free simulation of a Rillion accounts-payable workflow. It uses fictional Northstar Manufacturing data and is not connected to Demo51 or any production service. One Precision Tools invoice moves through Capture, Invoice Log, manager approval, and Payments; persona walkthroughs cover AP, approvers, and finance leaders; and all eleven Analytics boards use lazy-loaded, source-faithful product references. Invoice Log purchase-order variances open into matching evidence with confidence and explanations. Shareable scenario links can open a role-specific module without the welcome dialog, while the completed walkthrough hands prospects to Rillion's official live-demo page.

Explore the live demo at <https://taste4458.github.io/rillion-demo-site/>.

Share a role-specific starting point with `?scenario=ap`, `?scenario=approver`, or `?scenario=finance`; add `&welcome=0` to bypass the welcome dialog.

## Run locally

```sh
python3 -m http.server 4173
```

Open <http://127.0.0.1:4173/>.

## Check the simulation contract

```sh
node check.mjs
```
