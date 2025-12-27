import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankComparator } from "./bank-comparator";
import { BrokerageComparator } from "./brokerage-comparator";
import FeeSimulator from "./fee-simulator";

export default function ToolsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Comparateurs & Simulateurs</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Prenez des décisions basées sur les données. Comparez les produits financiers et simulez l'impact des frais sur vos investissements.
        </p>
      </div>

      <Tabs defaultValue="fee-simulator" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto h-auto">
          <TabsTrigger value="fee-simulator" className="py-2">Simulateur de Frais</TabsTrigger>
          <TabsTrigger value="bank-comparator" className="py-2">Comparateur de Banques</TabsTrigger>
          <TabsTrigger value="brokerage-comparator" className="py-2">Comparateur de Courtiers</TabsTrigger>
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
