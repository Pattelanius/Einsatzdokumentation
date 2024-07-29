import React from 'react'
import { useState } from 'react';
import { Stepper, Button, Group, Container } from '@mantine/core';
import GeneralStep from '../GeneralStep/GeneralStep';
import { useForm } from '@mantine/form';
import InvolvedPersons from '../InvolvedPersons/InvolvedPersons';
import MissionDetails from '../MissionDetails/MissionDetails';
import { jsPDF } from "jspdf";

function DocumentationWrapper() {
    const [activeTab, setActiveTab] = useState(0)
    const nextStep = () => setActiveTab((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActiveTab((current) => (current > 0 ? current - 1 : current));
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            missionKey: '',
            startedAt: '',
            endedAt: '',
            missionLeader: '',
            missionKeyword: '',
            missionLocation: '',
            involvedPersons: [],
            policeDocumentNumber: '',
            usedVehicles: [],
            missionText: '',
            missionPictures: []
        },
    })

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const exportAsPdf = async () => {
        const doc = new jsPDF();
        const formValues = form.getValues();

        console.log(formValues)
        const marginX = 15;
        const marginY = 15;
        let currentY = marginY

        doc.setFontSize(40);
        doc.text('Einsatzbericht', 105, currentY, null, null, "center");
        doc.setFontSize(20);

        currentY += marginY

        doc.text(`Feuerwehr XYZ- Einsatz Nr. ${formValues.missionKey}`, 105, currentY, null, null, "center");
        doc.setFontSize(12);

        currentY += marginY

        doc.text(`Einsatzort: ${formValues.missionLocation}`, marginX, currentY);

        currentY += marginY
        doc.text(`Einsatzleiter: ${formValues.missionLeader}`, marginX, currentY);

        currentY += marginY
        doc.text(`Einsatzstart: ${formValues.startedAt}`, marginX, currentY);

        currentY += marginY
        doc.text(`Einsatzende: ${formValues.endedAt}`, marginX, currentY);

        currentY += marginY
        doc.text(`Ausgerückte Fahrzeuge: ${formValues.usedVehicles.join(', ')}`, marginX, currentY);

        currentY += marginY
        doc.text(`Einsatzstichwort: ${formValues.missionKeyword}`, marginX, currentY);

        currentY += marginY
        const missionDescription = doc.splitTextToSize(formValues.missionText, currentY)
        const defaultSpaceBetweenLines = 5
        const pageHeight = doc.internal.pageSize.height;

        missionDescription.forEach((line) => {
            if (currentY > pageHeight - marginX) {
                currentY = marginX
                doc.addPage()
            }

            doc.text(15, currentY, line);
            currentY += defaultSpaceBetweenLines
        });

        currentY += marginY

        const missionPictures = formValues.missionPictures
        let currentX = marginX

        console.log(missionPictures)

        for await (const missionPicture of missionPictures) {
            const pictureAsBase64 = await toBase64(missionPicture)
            doc.addImage(pictureAsBase64, 'JPEG', currentX, currentY, 150, 150)

            currentX += marginX + 150
        }

        if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())) {
            window.open(doc.output('bloburl'))
        } else {
            doc.save()
        }
    }

    return (
        <Container>
            <Stepper active={activeTab} onStepClick={setActiveTab}>
                <Stepper.Step label="Allgemeines" description="Allgemeine Informationen zum Einsatz">
                    <GeneralStep form={form} />
                </Stepper.Step>
                <Stepper.Step label="Angaben zu den Beteiligten" description="Beteiligte Personen">
                    <InvolvedPersons form={form} />
                </Stepper.Step>
                <Stepper.Step label="Einsatzdetails">
                    <MissionDetails form={form} />
                </Stepper.Step>
                <Stepper.Completed>
                    <Button onClick={exportAsPdf}>Als PDF speichern</Button>
                </Stepper.Completed>
            </Stepper>
            <Group justify="center" mt="xl">
                <Button variant="default" onClick={prevStep}>Back</Button>
                <Button onClick={nextStep}>Next step</Button>
            </Group>
        </Container>
    )
}

export default DocumentationWrapper