import Radio from "../../components/shared/Radio";
import Select from "../../components/shared/Select";
import TextField from "../../components/shared/TextField";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrBitcoin } from "react-icons/gr";
import { FaEthereum } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import Button from "../../components/shared/Button";
import LoadingScreen from "../../components/LoadingScreen";
import { useNavigate, useParams } from "react-router-dom";
import NotFoundPage from "../not-found/NotFound";
import Lottery from "../../types/Lottery";
import { z } from "zod";
import axios from "../../lib/axios";
import { useCustomer } from "../../hooks";
import { useAtom } from "jotai";
import { lotteriesAtom, pageWrapperDataAtom } from "../../atoms";

const checkoutSchema = z.object({
  firstName: z.string().min(1, { message: "Please, input your first name." }),
  lastName: z.string().min(1, { message: "Please, input your last name." }),
  email: z.string().email("Please, input a valid email."),
  phone: z.string().min(1, { message: "Please, input your phone." }),
  country: z.string().min(1, { message: "Please, choose your country." }),
  state: z.string().min(1, { message: "Please, input your state." }),
  zipCode: z.string().min(1, { message: "Please, input your zip code." }),
});

type CheckoutSchemaType = z.infer<typeof checkoutSchema>;

type LotteryPageParams = {
  lotteryId: string;
};

const LotteryPage = () => {
  const { lotteryId } = useParams<LotteryPageParams>();
  const navigate = useNavigate();
  const { customer } = useCustomer();
  const [lottery, setLottery] = useState<Lottery | undefined | null>(undefined);
  const [lotteries] = useAtom(lotteriesAtom);

  const [, setPageWrapperData] = useAtom(pageWrapperDataAtom);

  const getLottery = useCallback(() => {
    const lottery = lotteries?.find((lottery) => lottery.id == lotteryId);
    if (lottery) {
      setLottery(lottery);
      return;
    }
    axios
      .get(`/api/lottery/${lotteryId}/`)
      .then(({ data }) => {
        setLottery(data);
      })
      .catch(() => setLottery(null));
  }, [lotteryId, lotteries, setLottery]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: customer?.firstName || "",
      lastName: customer?.lastName || "",
      email: customer?.email || "",
      phone: customer?.phone || "",
      country: customer?.country || "",
      state: customer?.state || "",
      zipCode: customer?.zipCode || "",
    },
  });

  const onSubmit: SubmitHandler<CheckoutSchemaType> = useCallback(
    async (data) => {
      const {
        data: { ticket, credentials },
      } = await axios.post(`/api/ticket/`, {
        lotteryId,
        customerInfo: data,
      });
      let ticketPageUrl = `/ticket/${ticket.id}`;
      if (credentials.id && credentials.secret && !customer) {
        ticketPageUrl = `${ticketPageUrl}/?customerId=${credentials.id}&customerSecret=${credentials.secret}`;
      }
      navigate(ticketPageUrl);
    },
    [lotteryId, customer, navigate]
  );

  useEffect(() => {
    setPageWrapperData({
      header: lottery?.name || "",
      title: "Take a look at this lottery!",
    });
  }, [lottery, setPageWrapperData]);

  useEffect(() => {
    setLottery(undefined);
    getLottery();
  }, [setLottery, getLottery]);

  if (lottery === undefined) {
    return <LoadingScreen />;
  }

  if (lotteryId === undefined || lottery === null) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 text-sm text-gray-600">
        By purchasing a lottery ticket on Cloverland, you acknowledge and agree
        to the terms and conditions outlined by the platform. This includes
        accepting responsibility for any risks or consequences that may arise
        from using the platform, as well as complying with all relevant laws and
        regulations. Please gamble responsibly and only spend what you can
        afford to lose.
      </div>
      <div className="flex w-full flex-wrap-reverse gap-4 sm:flex-nowrap">
        <form
          className="flex w-full flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4">
            <div className="font-medium text-gray-900">Billing Details</div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2">
                <div className="w-full">
                  <TextField
                    label="First Name"
                    disabled={!!customer}
                    {...register("firstName")}
                    errorMessage={errors.firstName?.message}
                  />
                </div>
                <div className="w-full">
                  <TextField
                    label="Last Name"
                    disabled={!!customer}
                    {...register("lastName")}
                    errorMessage={errors.lastName?.message}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-full">
                  <TextField
                    label="Email"
                    disabled={!!customer}
                    {...register("email")}
                    errorMessage={errors.email?.message}
                  />
                </div>
                <div className="w-full">
                  <TextField
                    label="Phone"
                    disabled={!!customer}
                    placeholder="+"
                    {...register("phone")}
                    errorMessage={errors.email?.message}
                  />
                </div>
              </div>
              <Select
                label="Country"
                disabled={!!customer}
                {...register("country")}
                errorMessage={errors.country?.message}
              >
                <option value="">Choose a country</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Åland Islands">Åland Islands</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Anguilla">Anguilla</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bosnia and Herzegovina">
                  Bosnia and Herzegovina
                </option>
                <option value="Botswana">Botswana</option>
                <option value="Bouvet Island">Bouvet Island</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Territory">
                  British Indian Ocean Territory
                </option>
                <option value="Brunei Darussalam">Brunei Darussalam</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">
                  Central African Republic
                </option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Christmas Island">Christmas Island</option>
                <option value="Cocos (Keeling) Islands">
                  Cocos (Keeling) Islands
                </option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Congo, The Democratic Republic of The">
                  Congo, The Democratic Republic of The
                </option>
                <option value="Cook Islands">Cook Islands</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cote D'ivoire">{"Cote D'ivoire"}</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Falkland Islands (Malvinas)">
                  Falkland Islands (Malvinas)
                </option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="French Southern Territories">
                  French Southern Territories
                </option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Gibraltar">Gibraltar</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guernsey">Guernsey</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-bissau">Guinea-bissau</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Heard Island and Mcdonald Islands">
                  Heard Island and Mcdonald Islands
                </option>
                <option value="Holy See (Vatican City State)">
                  Holy See (Vatican City State)
                </option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran, Islamic Republic of">
                  Iran, Islamic Republic of
                </option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Isle of Man">Isle of Man</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jersey">Jersey</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Korea, Democratic People's Republic of">
                  {"Korea, Democratic People's Republic of"}
                </option>
                <option value="Korea, Republic of">Korea, Republic of</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Lao People's Democratic Republic">
                  {"Lao People's Democratic Republic"}
                </option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libyan Arab Jamahiriya">
                  Libyan Arab Jamahiriya
                </option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macao">Macao</option>
                <option value="Macedonia, The Former Yugoslav Republic of">
                  Macedonia, The Former Yugoslav Republic of
                </option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Martinique">Martinique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Mexico">Mexico</option>
                <option value="Micronesia, Federated States of">
                  Micronesia, Federated States of
                </option>
                <option value="Moldova, Republic of">
                  Moldova, Republic of
                </option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montenegro">Montenegro</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Netherlands Antilles">
                  Netherlands Antilles
                </option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="Norfolk Island">Norfolk Island</option>
                <option value="Northern Mariana Islands">
                  Northern Mariana Islands
                </option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau">Palau</option>
                <option value="Palestinian Territory, Occupied">
                  Palestinian Territory, Occupied
                </option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Pitcairn">Pitcairn</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Reunion">Reunion</option>
                <option value="Romania">Romania</option>
                <option value="Russian Federation">Russian Federation</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Saint Helena">Saint Helena</option>
                <option value="Saint Kitts and Nevis">
                  Saint Kitts and Nevis
                </option>
                <option value="Saint Lucia">Saint Lucia</option>
                <option value="Saint Pierre and Miquelon">
                  Saint Pierre and Miquelon
                </option>
                <option value="Saint Vincent and The Grenadines">
                  Saint Vincent and The Grenadines
                </option>
                <option value="Samoa">Samoa</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome and Principe">
                  Sao Tome and Principe
                </option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Georgia and The South Sandwich Islands">
                  South Georgia and The South Sandwich Islands
                </option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Svalbard and Jan Mayen">
                  Svalbard and Jan Mayen
                </option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syrian Arab Republic">
                  Syrian Arab Republic
                </option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania, United Republic of">
                  Tanzania, United Republic of
                </option>
                <option value="Thailand">Thailand</option>
                <option value="Timor-leste">Timor-leste</option>
                <option value="Togo">Togo</option>
                <option value="Tokelau">Tokelau</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks and Caicos Islands">
                  Turks and Caicos Islands
                </option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Emirates">
                  United Arab Emirates
                </option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="United States Minor Outlying Islands">
                  United States Minor Outlying Islands
                </option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Viet Nam">Viet Nam</option>
                <option value="Virgin Islands, British">
                  Virgin Islands, British
                </option>
                <option value="Virgin Islands, U.S.">
                  Virgin Islands, U.S.
                </option>
                <option value="Wallis and Futuna">Wallis and Futuna</option>
                <option value="Western Sahara">Western Sahara</option>
                <option value="Yemen">Yemen</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </Select>
              <div className="flex gap-2">
                <div className="w-full">
                  <TextField
                    label="State"
                    {...register("state")}
                    disabled={!!customer}
                    errorMessage={errors.state?.message}
                  />
                </div>
                <div className="w-full">
                  <TextField
                    label="Zip Code"
                    {...register("zipCode")}
                    disabled={!!customer}
                    errorMessage={errors.zipCode?.message}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-medium text-gray-900">Payment Method</div>
            <div className="flex flex-col gap-1">
              <Radio
                label={
                  <div className="flex items-center gap-2">
                    <div>Cryptocurrency</div>
                    <div className="flex items-center">
                      <GrBitcoin className="text-lg text-orange-400" />
                      <FaEthereum className="text-lg text-gray-600" />
                    </div>
                  </div>
                }
                name="payment"
                defaultChecked
              />
            </div>
          </div>
          <Button loading={isSubmitting}>Submit</Button>
        </form>
        <div className="flex w-full max-w-full flex-col justify-between gap-4 border border-gray-300 bg-white p-4 sm:max-w-xs">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div>
                <AiOutlineShoppingCart />
              </div>
              <div>Ticket details</div>
            </div>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex justify-between gap-4">
                <div className="font-medium">1 x {lottery.name} Ticket</div>
                <div className="whitespace-nowrap font-medium">
                  {lottery.price} {lottery.symbol}
                </div>
              </div>
              <div>
                <div
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: lottery.description,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <hr />
            <div className="flex justify-end gap-1 text-sm">
              <div>Subtotal:</div>
              <div className="font-medium">
                {lottery.price} {lottery.symbol}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LotteryPage;
