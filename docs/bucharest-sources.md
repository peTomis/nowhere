# Bucharest city card

The first city card is in the Cities chapter, under Wallachia. Its five traces follow
album order. Mihai Vodă, the Parliament and the former Central Committee keep their
existing IDs, numbers and photos; Stavropoleos and the Athenaeum are appended.

The introduction reads the city through changes in scale and urban fabric. Each trace
has one focus: displaced heritage, monumental redevelopment, revolutionary memory,
the merchant city, and the cultural ambitions of the modern capital. This is not a
walking itinerary. Only three years appear in the card: 1724, 1888 and 1989.

## Evidence consulted

- Stavropoleos: [the monastery's church and courtyard history](https://stavropoleos.ro/biserica-2-2/)
  and the [National Archaeological Repertory](https://ran.cimec.ro/sel.asp?Lang=EN&descript=bucuresti-municipiul-bucuresti-bucuresti-ansamblul-manastirii-stavropoleos-din-bucuresti-cod-sit-ran-179132.176)
  agree on the 1724 foundation, the former inn and the later rebuilding of the enclosure.
  The description distinguishes the church from the later courtyard. The meeting of
  Stavropoleos and Poștei streets avoids conflicting street-number conventions.
- Athenaeum: [George Enescu Philharmonic history](https://filarmonicaenescu.ro/ro/istoric-ateneul-roman)
  and the [University of Florence chronology](https://www.clrm.unifi.it/index.php?func=viewpage&module=CMpro&newlang=ron&pageid=607)
  corroborate the 1888 inauguration, French architect and public fundraising.
  [The Philharmonic's access page](https://filarmonicaenescu.ro/ro/directii-acces)
  confirms Benjamin Franklin 1–3. No opening hours or ticket price are promised.
- Mihai Vodă: [the archdiocese's monument record](https://arhiepiscopiabucurestilor.ro/exarhat/manastiri/manastirea-mihai-voda)
  and [the Bucharest Museum's archaeological paper](https://bmim.muzeulbucurestiului.ro/?articol=13216-descoperiri-arheologice-pe-santierele-de-translare-partea-i-bisericile-schitului-maicilor-olari-si-mihai-voda)
  corroborate the survival and relocation of the church and belfry. The new city text
  does not repeat the disputed foundation year or precise relocation distances.
- Parliament: [Sector 5's monument page](https://sector5.ro/puncte-de-interes/palatul-parlamentului/)
  and [Radio Romania's oral-history interview with heritage historian Speranța Diaconescu](https://www.rri.ro/en/panoramice/pro-memoria/the-uranus-district-id131668.html)
  support the new civic centre, demolition of the old district and its monumental setting.
  The city description adds no demolition totals. The Parliament conference centre's
  history page returned HTTP 502; the World Monuments Fund report and Uranus Acum PDF
  also failed to open. These failed pages are not counted as evidence. The existing
  practical-access TODO remains unchanged.
- Former Central Committee: [AGERPRES reporting from inside the building](https://agerpres.ro/social/2019/12/22/balconul-de-unde-a-vorbit-ceausescu-biroul-sau-si-celulele-securitatii---vizitate-de-mii-de-persoane--424090)
  and [Realitatea's on-site report](https://www.realitatea.net/stiri/politica/birou-nicolae-ceausescu-revolutie-1989-cc-pcr_5dcc925e406af85273d68d0d)
  document the balcony, roof and conversion to the Interior Ministry. Their exceptional
  interior access is not presented as a regular visitor option.

All linked pages above were opened. The failed reference URLs are deliberately not
used as citations. This is a bounded source record, not an external historian's sign-off.

## Assets and implementation

Two new image TODOs remain: freely licensed exterior photos of Stavropoleos and the
Athenaeum. The neutral stock placeholders remain until provenance is established.

`CardText.traceTexts` optionally supplies descriptions keyed by the card's existing
trace IDs. `cardsOf` passes these plain strings to the client; `CardTraces` supplies them
to `Trace`. Without an override the shared description is used, including in the album.
Addresses, images, identity and collection state are never copied. The validator rejects
unknown or blank overrides. The template's city card demonstrates the same feature.
