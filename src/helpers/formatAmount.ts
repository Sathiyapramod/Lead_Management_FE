export default function formatAmt(amt: number) {
    return new Intl.NumberFormat("en-US").format(amt);
}
