import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankComparator } from "./bank-comparator";
import { BrokerageComparator } from "./brokerage-comparator";
import FeeSimulator from "./fee-simulator";

export default function ToolsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Comparators & Simulators</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Make data-driven decisions. Compare financial products and simulate the impact of fees on your investments.
        </p>
      </div>

      <Tabs defaultValue="fee-simulator" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto h-auto">
          <TabsTrigger value="fee-simulator" className="py-2">Fee Simulator</TabsTrigger>
          <TabsTrigger value="bank-comparator" className="py-2">Bank Comparator</TabsTrigger>
          <TabsTrigger value="brokerage-comparator" className="py-2">Brokerage Comparator</TabsTrigger>
        </TabsList>
        <div className="mt-8">
            <TabsContent value="fee-simulator">
                <FeeSimulator />
            </TabsContent>
            <TabsContent value="bank-comparator">
                <BankComparator />
            </TabsContent>
            <TabsContent value="brokerage-comparator">
                <BrokerageComparator />
            </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
