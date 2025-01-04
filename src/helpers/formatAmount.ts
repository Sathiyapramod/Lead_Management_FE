export default function formatAmt(amt: number): string {
    return new Intl.NumberFormat("en-US").format(amt);
}
