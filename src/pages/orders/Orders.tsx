import { Box, Divider, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../redux/store";
import "./Orders.scss";
import constants from "../../constants/constants";

const Orders = () => {
  const Orders = useAppSelector((state) => state.orders);
  return (
    <Box className="orders">
      <Typography component="h5" variant="h5">
        {constants.orders}
      </Typography>

      {Orders?.map(({ orderID, total, orders }) => {
        return (
          <Box key={orderID} className="order">
            <Box className="header">
              <Typography component="h6" variant="body2">
                {`Order ID: #${orderID}`}
              </Typography>
              <Typography component="h6" variant="body2">
                {`Total: ₹ ${total} /-`}
              </Typography>
            </Box>

            <Typography component="h6" variant="h6" my={1}>
              {constants.items}
            </Typography>

            <Box className="items">
              {orders?.map(({ id, img, name, rate, qty }, index) => {
                return (
                  <>
                    <Box key={id}>
                      <Stack direction="row" justifyContent="space-between">
                        <Stack direction="row">
                          <Box
                            component="img"
                            src={img}
                            height="50px"
                            width="50px"
                          />
                          <Stack direction="column" px={1}>
                            <Typography component="p">{name}</Typography>
                            <Typography component="p">
                              {`₹ ${Number(rate)} /-`}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Typography component="p">
                          {`${qty} * ${Number(rate)} = ₹ ${
                            qty * Number(rate)
                          } /-`}
                        </Typography>
                      </Stack>
                    </Box>
                    {index !== orders.length - 1 && (
                      <Box my={1}>
                        <Divider />
                      </Box>
                    )}
                  </>
                );
              })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Orders;
